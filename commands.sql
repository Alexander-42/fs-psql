CREATE TABLE blogs (id SERIAL PRIMARY KEY, author TEXT, url TEXT NOT NULL, title TEXT NOT NULL, likes INTEGER DEFAULT 0);
INSERT INTO blogs (author, url, title) VALUES ('Jane Doe', 'https://example.com/blog1', 'Example blog 1');
INSERT INTO blogs (url, title) VALUES ('https://example.com/blog2', 'Example blog 2 no author');
