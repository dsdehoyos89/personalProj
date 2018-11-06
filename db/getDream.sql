-- SELECT * FROM dreams 
-- WHERE user_id = $1;

-- SELECT * FROM dreams 
-- WHERE dream_id in 
-- (SELECT users.user_id FROM dreams
-- join users on dreams.user_id = users.user_id
-- where dreams.category = 'private');

select dream,dream_id
from dreams 
join users u 
on dreams.user_id = u.user_id
where dreams.user_id = $1;