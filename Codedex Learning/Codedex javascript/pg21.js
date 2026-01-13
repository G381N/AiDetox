// Finding the First Odd Number and Stopping at 42

for(let i=0;i<50;i++)
{ if(i==42)
{
  console.log(i);
  break;
}
  if(i%2==0)
  {
    continue;
  }
  console.log(i);
}