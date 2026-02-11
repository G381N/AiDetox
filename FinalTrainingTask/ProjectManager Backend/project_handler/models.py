from mongoengine import Document, StringField, ReferenceField, DateTimeField
from datetime import datetime


class Project(Document):
	meta = {"collection": "projects", "db_alias": "project_db"}
	name = StringField(required=True)
	description = StringField()
	owner = ReferenceField('auth_handler.models.User', required=True)
	created_at = DateTimeField(default=datetime.utcnow)


class Task(Document):
	meta = {"collection": "tasks", "db_alias": "project_db"}
	title = StringField(required=True)
	description = StringField()
	status = StringField(choices=("Todo", "In Progress", "Done"), default="Todo")
	project = ReferenceField(Project, required=True)
	created_at = DateTimeField(default=datetime.utcnow)


# This is how i understood the flow :
# Create Project:

# Step 1 : user sends name + optional description
# Step 2 : view sets owner = request.user
# Step 3 : project.save() stores it in project_db

# Create Task:
# Step 1 : user sends title + optional description/status
# Step 2 : view verifies project ownership (project.owner == request.user)
# Step 3 : task.project = project, task.save()
