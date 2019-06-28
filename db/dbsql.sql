CREATE TABLE songs (
id SERIAL PRIMARY KEY,
title VARCHAR(100) NOT NULL,
song_writer VARCHAR(20),
tempo VARCHAR(10),
root_key VARCHAR(5)
);

CREATE TABLE verses (
id SERIAL PRIMARY KEY,
v_lyrics TEXT,
v_number INT,
songs_id INT REFERENCES songs(id)
);

CREATE TABLE chorus (
id SERIAL PRIMARY KEY,
c_lyrics TEXT,
songs_id INT REFERENCES songs(id)
);

CREATE TABLE bridge (
id SERIAL PRIMARY KEY,
b_lyrics TEXT,
songs_id INT REFERENCES songs(id)
);

CREATE TABLE chords (
id SERIAL PRIMARY KEY,
chord_1 VARCHAR(5),
chord_2 VARCHAR(5),
chord_3 VARCHAR(5),
chord_4 VARCHAR(5),
chord_5 VARCHAR(5),
chord_6 VARCHAR(5),
chord_7 VARCHAR(5),
chord_8 VARCHAR(5),
songs_id INT REFERENCES songs(id),
verse_id INT REFERENCES verses(id),
chorus_id INT REFERENCES chorus(id),
bridge_id INT REFERENCES bridge(id)
);

INSERT INTO songs (title, song_writer, tempo, root_key)
VALUES ('Boogie Woogie Bugle Boy', 'Don Raye', '4/4', 'D');

INSERT INTO verses (v_lyrics, v_number, songs_id)
VALUES ('He was a famous trumpet man from out Chicago way
He had a boogie style that no one else could play
He was the top man at his craft
But then his number came up and he was gone with the draft
Hes in the army now, a-blowin reveille
Hes the boogie woogie bugle boy of Company B', 1, 1),
('They made him blow a bugle for his Uncle Sam
It really brought him down because he couldnt jam
The captain seemed to understand
Because the next day the cap went out and drafted a band
And now the company jumps when he plays reveille
Hes the boogie woogie bugle boy of Company B', 2, 1);

INSERT INTO chorus (c_lyrics, songs_id)
VALUES ('Toot-toot-toot, toot-diddelyada, toot-diddelyada
Toot, toot, he blows it eight-to-the-bar
He cant blow a note if the bass and guitar isnt with Im
A-a-a-and the company jumps when he plays reveille
Hes the boogie woogie bugle boy of Company B', 1);

INSERT INTO bridge(b_lyrics, songs_id)
VALUES ('He was our boogie woogie bugle boy of Company B
And when he plays boogie woogie bugle he was buzy as a "bzzz" bee
And when he plays he makes the company jump eight-to-the-bar
Hes the boogie woogie bugle boy of Company B', 1);

INSERT INTO chords (chord_1, chord_2, chord_3, chord_4, chord_5, chord_6, chord_7, songs_id, verse_id)
VALUES ('D', 'Em', 'F#m', 'G', 'A', 'Bm', 'c#dim', 1, 1);

SELECT title, song_writer, tempo, root_key, v_lyrics From songs JOIN verses ON songs.id = verses.songs_id 
WHERE songs.id = 1;