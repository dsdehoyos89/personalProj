-- select * from dreams 
-- where category = 'public'
-- order by date_created desc;



select * from dreams 
join users on users.user_id = dreams.user_id
where category = 'public'
order by date_created desc;


-- select dream,dream_id,date_created, lucidity, cohesion, rating
-- from dreams 
-- join users u 
-- on dreams.user_id = u.user_id
-- where dreams.user_id = $1
-- order by date_created desc ;

