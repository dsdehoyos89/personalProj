
select dream,dream_id,date_created, lucidity, cohesion, rating
from dreams 
join users u 
on dreams.user_id = u.user_id
where dreams.user_id = $1
order by date_created desc ;
