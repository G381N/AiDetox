
import json
import uuid

BASE_URL = "http://127.0.0.1:8000"

def create_request(name, method, url, body=None, auth_token_var=None, script=None):
    req = {
        "name": name,
        "request": {
            "method": method,
            "header": [],
            "url": {
                "raw": url,
                "host": url.split("://")[1].split("/")[0].split("."),
                "path": url.split("://")[1].split("/")[1:]
            }
        },
        "response": []
    }
    
    if method in ["POST", "PUT"] and body:
        req["request"]["header"].append({"key": "Content-Type", "value": "application/json"})
        req["request"]["body"] = {
            "mode": "raw",
            "raw": json.dumps(body, indent=2)
        }
        
    if auth_token_var:
        req["request"]["auth"] = {
            "type": "bearer",
            "bearer": [
                {"key": "token", "value": "{{" + auth_token_var + "}}", "type": "string"}
            ]
        }
        
    if script:
        req["event"] = [{
            "listen": "test",
            "script": {
                "exec": script,
                "type": "text/javascript"
            }
        }]
        
    return req

# Script to save token to environment
save_token_script = [
    "var jsonData = pm.response.json();",
    "pm.environment.set('token', jsonData.access);"
]

# Script to save Alice's token
save_alice_token = [
    "var jsonData = pm.response.json();",
    "pm.environment.set('token_alice', jsonData.access);",
    "console.log('Alice Token Saved');"
]

# Script to save Bob's token
save_bob_token = [
    "var jsonData = pm.response.json();",
    "pm.environment.set('token_bob', jsonData.access);",
    "console.log('Bob Token Saved');"
]

# Script to save Project ID
save_project_id = [
    "var jsonData = pm.response.json();",
    "pm.environment.set('project_id', jsonData.project.id);",
    "console.log('Project ID Saved: ' + jsonData.project.id);"
]

collection = {
    "info": {
        "name": "ProjectManager API",
        "description": "Test collection for ProjectManager Backend (Alice & Bob scenario)",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
        {
            "name": "1. Auth (Alice)",
            "item": [
                create_request("Register Alice", "POST", "{{base_url}}/api/auth/register/", {
                    "username": "alice", "email": "alice@example.com", "password": "password123", "password_confirm": "password123"
                }),
                create_request("Login Alice", "POST", "{{base_url}}/api/auth/login/", {
                    "first_credential": "alice", "password": "password123"
                }, script=save_alice_token)
            ]
        },
        {
            "name": "2. Auth (Bob)",
            "item": [
                create_request("Register Bob", "POST", "{{base_url}}/api/auth/register/", {
                    "username": "bob", "email": "bob@example.com", "password": "password123", "password_confirm": "password123"
                }),
                create_request("Login Bob", "POST", "{{base_url}}/api/auth/login/", {
                    "first_credential": "bob", "password": "password123"
                }, script=save_bob_token)
            ]
        },
        {
            "name": "3. Projects (Alice)",
            "item": [
                create_request("Create Project A1", "POST", "{{base_url}}/api/projects/", {
                    "name": "Alice App", "description": "Alice's First Project"
                }, auth_token_var="token_alice", script=save_project_id),
                create_request("Create Project A2", "POST", "{{base_url}}/api/projects/", {
                    "name": "Alice Website", "description": "Another project"
                }, auth_token_var="token_alice"),
                create_request("List Projects (Alice)", "GET", "{{base_url}}/api/projects/", auth_token_var="token_alice")
            ]
        },
        {
            "name": "4. Projects (Bob)",
            "item": [
                create_request("Create Project B1", "POST", "{{base_url}}/api/projects/", {
                    "name": "Bob's System", "description": "Secret stuff"
                }, auth_token_var="token_bob"),
                create_request("List Projects (Bob)", "GET", "{{base_url}}/api/projects/", auth_token_var="token_bob")
            ]
        },
        {
            "name": "5. Tasks (Alice - in Project A1)",
            "item": [
                create_request("Create Task T1 (Todo)", "POST", "{{base_url}}/api/projects/{{project_id}}/tasks/", {
                    "title": "Design DB", "description": "Schema design", "status": "Todo"
                }, auth_token_var="token_alice"),
                create_request("Create Task T2 (In Progress)", "POST", "{{base_url}}/api/projects/{{project_id}}/tasks/", {
                    "title": "Build API", "status": "In Progress"
                }, auth_token_var="token_alice"),
                create_request("List All Tasks", "GET", "{{base_url}}/api/projects/{{project_id}}/tasks/", auth_token_var="token_alice"),
                create_request("Filter Tasks (In Progress)", "GET", "{{base_url}}/api/projects/{{project_id}}/tasks/?status=In Progress", auth_token_var="token_alice")
            ]
        },
        {
             "name": "6. Security Check (Bob attacking Alice)",
             "item": [
                 create_request("Bob tries to access Alice's Project", "GET", "{{base_url}}/api/projects/{{project_id}}/tasks/", auth_token_var="token_bob", script=[
                     "pm.test('Should be Forbidden', function () { pm.response.to.have.status(403); });"
                 ])
             ]
        }
    ],
    "variable": [
        {"key": "base_url", "value": "http://127.0.0.1:8000", "type": "string"}
    ]
}

with open("ProjectManager_Collection.json", "w") as f:
    json.dump(collection, f, indent=4)

print("Collection created successfully!")
