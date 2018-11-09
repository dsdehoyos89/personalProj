UPDATE dreams 
SET lucidity=$1,
    cohesion=$2,
    rating=$3
WHERE dream_id = $4;

SELECT * FROM dreams
where dream_id=$4;