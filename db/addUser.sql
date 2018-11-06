INSERT INTO users (email, profile_name, profile_id)
    VALUES($1, $2, $3);
SELECT * FROM users 
WHERE profile_id = $3;
