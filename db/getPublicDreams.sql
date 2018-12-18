


select * from dreams 
join users on users.user_id = dreams.user_id
where category = 'public'
order by date_created desc;


