UPDATE dreams
Set dream = $1
where user_id = $2;

Select * from dreams;