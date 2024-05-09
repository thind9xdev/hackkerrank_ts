SELECT 
    id,
    first_name,
    last_name
FROM 
    CUSTOMER
WHERE 
    CHAR_LENGTH(CONCAT(first_name, last_name)) < 12
ORDER BY 
    CHAR_LENGTH(CONCAT(first_name, last_name)), 
    LOWER(CONCAT(first_name, last_name)), 
    id;