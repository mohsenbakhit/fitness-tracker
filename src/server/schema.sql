-- All Drop table statements
DROP TABLE PaidUser2;
DROP TABLE PaidUser1;

DROP TABLE PaidUser1;
DROP TRIGGER exercise_insert_trigger;
DROP TABLE Exercise;

DROP SEQUENCE epid_sequence;
DROP TRIGGER explan_insert_trigger;
ALTER TABLE ExercisePlan DROP CONSTRAINT userid;
ALTER TABLE ExercisePlan DROP CONSTRAINT tid;
DROP TABLE ExercisePlan;

DROP SEQUENCE nid_sequence;
DROP TRIGGER nutrition_insert_trigger;
ALTER TABLE Nutrition DROP CONSTRAINT userid;
DROP TABLE Nutrition;

DROP SEQUENCE gid_sequence;
DROP TRIGGER goals_insert_trigger;
DROP TABLE Goals;

DROP SEQUENCE aid_sequence;
DROP TRIGGER ad_insert_trigger;
DROP TABLE Ad;

DROP SEQUENCE cid_sequence;
DROP TRIGGER content_insert_trigger;
DROP TABLE Content;

DROP TABLE PlanIncludes;

DROP SEQUENCE pid_sequence;
DROP TRIGGER progress_insert_trigger;
DROP TABLE ProgressReport;

DROP TABLE GoalReports;

DROP SEQUENCE rid_sequence;
DROP TRIGGER notifications_insert_trigger;
DROP TABLE Notifications;

DROP SEQUENCE tid_sequence;
DROP TRIGGER trainer_insert_trigger;
DROP TABLE Trainer;

DROP SEQUENCE uid_sequence;
DROP TRIGGER fuser_insert_trigger;
ALTER TABLE FUser DROP PRIMARY KEY;
DROP TABLE FUser;


-- FUser
CREATE TABLE FUser(
    userid INTEGER,
    name VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(72),
    PRIMARY KEY (userid),
    CONSTRAINT email_unique UNIQUE (email)
);

CREATE SEQUENCE uid_sequence
    START WITH 1
    INCREMENT BY 1;

CREATE OR REPLACE TRIGGER fuser_insert_trigger
BEFORE INSERT
ON FUser
REFERENCING NEW AS NEW
FOR EACH ROW
BEGIN
SELECT uid_sequence.nextval INTO :NEW.userid FROM dual
END;

-- Trainer

CREATE TABLE Trainer(
    tid INTEGER,
    name VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(72),
    city VARCHAR(60),
    country VARCHAR(50),
    PRIMARY KEY (tid),
    CONSTRAINT trainer_email_unique UNIQUE (email)
);

CREATE SEQUENCE tid_sequence
    START WITH 1
    INCREMENT BY 1;

CREATE OR REPLACE TRIGGER trainer_insert_trigger
BEFORE INSERT
ON Trainer
REFERENCING NEW AS NEW
FOR EACH ROW
BEGIN
SELECT tid_sequence.nextval INTO :NEW.tid FROM dual
END;

-- Paid User 2
CREATE TABLE PaidUser2(
    postalCode VARCHAR(10),
    country VARCHAR(50),
    city VARCHAR(60),
    PRIMARY KEY (postalCode, country)
);

-- Paid User 1
CREATE TABLE PaidUser1(
    userid INTEGER,
    postalCode VARCHAR(10),
    country VARCHAR(50),
    tid INTEGER,
    PRIMARY KEY (userid, postalCode, country),
    FOREIGN KEY (postalCode, country) REFERENCES PaidUser2(postalCode, country),
    FOREIGN KEY (userid) REFERENCES FUser(userid) ON DELETE CASCADE,
    FOREIGN KEY (tid) REFERENCES Trainer(tid) ON DELETE CASCADE
);

-- Exercise Table
CREATE TABLE Exercise(
    eid INTEGER,
    name VARCHAR(50),
    etype VARCHAR(50),
    PRIMARY KEY (eid)
);

CREATE SEQUENCE eid_sequence
    START WITH 1
    INCREMENT BY 1;

CREATE OR REPLACE TRIGGER exercise_insert_trigger
BEFORE INSERT
ON Exercise
REFERENCING NEW AS NEW
FOR EACH ROW
BEGIN
SELECT eid_sequence.nextval INTO :NEW.eid FROM dual
END;

-- Exercise Plan Table
CREATE TABLE ExercisePlan(
    epid INTEGER,
    plantype VARCHAR(50),
    tid INTEGER,
    userid INTEGER,
    PRIMARY KEY (epid),
    FOREIGN KEY (userid) REFERENCES FUser(userid) ON DELETE CASCADE,
    FOREIGN KEY (tid) REFERENCES Trainer(tid) ON DELETE CASCADE
);

CREATE SEQUENCE epid_sequence
    START WITH 1
    INCREMENT BY 1;

CREATE OR REPLACE TRIGGER explan_insert_trigger
BEFORE INSERT
ON ExercisePlan
REFERENCING NEW AS NEW
FOR EACH ROW
BEGIN
SELECT epid_sequence.nextval INTO :NEW.epid FROM dual
END;

-- Nutrition Plan
CREATE TABLE Nutrition(
    nid INTEGER,
    carbs INTEGER,
    fats INTEGER,
    protein INTEGER,
    calories INTEGER,
    userid INTEGER UNIQUE,
    PRIMARY KEY (nid),
    FOREIGN KEY (userid) REFERENCES FUser(userid) ON DELETE CASCADE
);

CREATE SEQUENCE nid_sequence
    START WITH 1
    INCREMENT BY 1;

CREATE OR REPLACE TRIGGER nutrition_insert_trigger
BEFORE INSERT
ON Nutrition
REFERENCING NEW AS NEW
FOR EACH ROW
BEGIN
SELECT nid_sequence.nextval INTO :NEW.nid FROM dual
END;

-- Goals Table
CREATE TABLE Goals(
    gid INTEGER,
    category VARCHAR(50),
    weight INTEGER,
    din VARCHAR(100),
    userid INTEGER,
    PRIMARY KEY (gid),
    FOREIGN KEY (userid) REFERENCES FUser(userid) ON DELETE CASCADE  
);

CREATE SEQUENCE gid_sequence
    START WITH 1
    INCREMENT BY 1;

CREATE OR REPLACE TRIGGER goals_insert_trigger
BEFORE INSERT
ON Goals
REFERENCING NEW AS NEW
FOR EACH ROW
BEGIN
SELECT gid_sequence.nextval INTO :NEW.gid FROM dual
END;

-- Ads Table

CREATE TABLE Ad(
    aid INTEGER,
    company VARCHAR(50),
    url VARCHAR(50),
    PRIMARY KEY (aid)
);

CREATE SEQUENCE aid_sequence
    START WITH 1
    INCREMENT BY 1;

CREATE OR REPLACE TRIGGER ad_insert_trigger
BEFORE INSERT
ON Ad
REFERENCING NEW AS NEW
FOR EACH ROW
BEGIN
SELECT aid_sequence.nextval INTO :NEW.aid FROM dual
END;

-- Content Table

CREATE TABLE Content(
    cid INTEGER,
    url VARCHAR(100),
    author VARCHAR(50),
    PRIMARY KEY (cid)
);

CREATE SEQUENCE cid_sequence
    START WITH 1
    INCREMENT BY 1;

CREATE OR REPLACE TRIGGER content_insert_trigger
BEFORE INSERT
ON Content
REFERENCING NEW AS NEW
FOR EACH ROW
BEGIN
SELECT cid_sequence.nextval INTO :NEW.cid FROM dual
END;

-- Notifications Table
CREATE TABLE Notifications(
    rid INTEGER,
    userid INTEGER,
    msg VARCHAR(150),
    PRIMARY KEY (rid, userid),
    FOREIGN KEY (userid) REFERENCES FUser(userid) ON DELETE CASCADE
);

CREATE SEQUENCE rid_sequence
    START WITH 1
    INCREMENT BY 1;

CREATE OR REPLACE TRIGGER notifications_insert_trigger
BEFORE INSERT
ON Notifications
REFERENCING NEW AS NEW
FOR EACH ROW
BEGIN
SELECT rid_sequence.nextval INTO :NEW.rid FROM dual
END;

-- Plan Includes Table

CREATE TABLE PlanIncludes(
    epid INTEGER,
    eid INTEGER,
    PRIMARY KEY(epid, eid),
    FOREIGN KEY(epid) REFERENCES ExercisePlan(epid) ON DELETE CASCADE,
    FOREIGN KEY(eid) REFERENCES Exercise(eid) ON DELETE CASCADE
);

-- Progress Reports Table

CREATE TABLE ProgressReport(
    pid INTEGER,
    Satisfaction VARCHAR(20),
    reportDate INTEGER,
    userid INTEGER,
    PRIMARY KEY (pid),
    FOREIGN KEY (userid) REFERENCES FUser(userid) ON DELETE CASCADE
);

CREATE SEQUENCE pid_sequence
    START WITH 1
    INCREMENT BY 1;

CREATE OR REPLACE TRIGGER progress_insert_trigger
BEFORE INSERT
ON ProgressReport
REFERENCING NEW AS NEW
FOR EACH ROW
BEGIN
SELECT pid_sequence.nextval INTO :NEW.pid FROM dual
END;

-- Goal Reports Table
CREATE TABLE GoalReports(
gid INTEGER,
pid INTEGER,
PRIMARY KEY(gid, pid),
FOREIGN KEY(gid) REFERENCES Goals(gid) ON DELETE CASCADE,
FOREIGN KEY(pid) REFERENCES ProgressReport(pid) ON DELETE CASCADE
);

-- Dummy variable inserts
INSERT INTO FUser (name, email, password) VALUES ('Ahmed Khan', 'ahmed.khan@gmail.com', 'eazyPassword');
INSERT INTO FUser (name, email, password) VALUES ('Maria Rodriguez', 'maria.rodriguez@hotmail.com', 'eazyPassword');
INSERT INTO FUser (name, email, password) VALUES ('Yuki Takahashi', 'yuki.takahashi@gmail.com', 'eazyPassword');
INSERT INTO FUser (name, email, password) VALUES ('Carlos Silva', 'carlos.silva@outlook.com', 'eazyPassword');
INSERT INTO FUser (name, email, password) VALUES ('Priya Patel', 'priya.patel@hotmail.com', 'eazyPassword');
INSERT INTO FUser (name, email, password) VALUES ('Miguel Rodriguez', 'miguel.rodriguez@gmail.com', 'eazyPassword');
INSERT INTO FUser (name, email, password) VALUES ('Ananya Gupta', 'ananya.gupta@outlook.com', 'eazyPassword');
INSERT INTO FUser (name, email, password) VALUES ('Kenji Suzuki', 'kenji.suzuki@hotmail.com', 'eazyPassword');
INSERT INTO FUser (name, email, password) VALUES ('Fatima Al-Mansoori', 'fatima.almansoori@gmail.com', 'eazyPassword');
INSERT INTO FUser (name, email, password) VALUES ('Darnell Washington', 'darnell.washington@outlook.com', 'eazyPassword');
INSERT INTO FUser (name, email, password) VALUES ('Aisha Nkosi', 'aisha.nkosi@hotmail.com', 'eazyPassword');
INSERT INTO FUser (name, email, password) VALUES ('Ravi Menon', 'ravi.menon@gmail.com', 'eazyPassword');
INSERT INTO FUser (name, email, password) VALUES ('Sofia Morales', 'sofia.morales@outlook.com', 'eazyPassword');
INSERT INTO FUser (name, email, password) VALUES ('Khaled Abadi', 'khaled.abadi@hotmail.com', 'eazyPassword');
INSERT INTO FUser (name, email, password) VALUES ('Aaliyah Rahman', 'aaliyah.rahman@gmail.com', 'eazyPassword');
INSERT INTO FUser (name, email, password) VALUES ('Juan Carlos Hernandez', 'juan.hernandez@outlook.com', 'eazyPassword');
INSERT INTO FUser (name, email, password) VALUES ('Zara Ali', 'zara.ali@hotmail.com', 'eazyPassword');
INSERT INTO FUser (name, email, password) VALUES ('Javier Castillo', 'javier.castillo@gmail.com', 'eazyPassword');
INSERT INTO FUser (name, email, password) VALUES ('Naomi Okafor', 'naomi.okafor@outlook.com', 'eazyPassword');
INSERT INTO FUser (name, email, password) VALUES ('Elijah Thompson', 'elijah.thompson@gmail.com', 'eazyPassword');

INSERT INTO Trainer (name, email, country, city, password) VALUES ('Yuki Tanaka', 'yuki.tanaka@yahoo.com', 'Japan', 'JP-Tokyo');
INSERT INTO Trainer (name, email, country, city, password) VALUES ('Emma Smith', 'emma.smith@hotmail.com', 'Australia', 'AU-Sydney');
INSERT INTO Trainer (name, email, country, city, password) VALUES ('Kgosi Ndlovu', 'kgosi.ndlovu@aol.com', 'South Africa', 'ZA-Johannesburg');
INSERT INTO Trainer (name, email, country, city, password) VALUES ('Aarav Patel', 'aarav.patel@outlook.com', 'India', 'IN-New Delhi');

INSERT INTO PaidUser2 (postalCode, country, city) VALUES ('20040-010', 'Brazil', 'BR-Rio de Janeiro');
INSERT INTO PaidUser2 (postalCode, country, city) VALUES ('100-0001', 'Japan', 'JP-Tokyo');
INSERT INTO PaidUser2 (postalCode, country, city) VALUES ('2000', 'Australia', 'AU-Sydney');
INSERT INTO PaidUser2 (postalCode, country, city) VALUES ('2196', 'South Africa', 'ZA-Johannesburg');
INSERT INTO PaidUser2 (postalCode, country, city) VALUES ('110001', 'India', 'IN-New Delhi');
INSERT INTO PaidUser2 (postalCode, country, city) VALUES ('06010', 'Mexico', 'MX-Mexico City');
INSERT INTO PaidUser2 (postalCode, country, city) VALUES ('101000', 'Russia', 'RU-Moscow');
INSERT INTO PaidUser2 (postalCode, country, city) VALUES ('11564', 'Saudi Arabia', 'SA-Riyadh');
INSERT INTO PaidUser2 (postalCode, country, city) VALUES ('C1002AAP', 'Argentina', 'AR-Buenos Aires');
INSERT INTO PaidUser2 (postalCode, country, city) VALUES ('100010', 'China', 'CN-Beijing');
INSERT INTO PaidUser2 (postalCode, country, city) VALUES ('00100', 'Italy', 'IT-Rome');
INSERT INTO PaidUser2 (postalCode, country, city) VALUES ('900001', 'Nigeria', 'NG-Lagos');
INSERT INTO PaidUser2 (postalCode, country, city) VALUES ('111 20', 'Sweden', 'SE-Stockholm');
INSERT INTO PaidUser2 (postalCode, country, city) VALUES ('03187', 'South Korea', 'KR-Seoul');
INSERT INTO PaidUser2 (postalCode, country, city) VALUES ('75001', 'France', 'FR-Paris');
INSERT INTO PaidUser2 (postalCode, country, city) VALUES ('M5A 1A1', 'Canada', 'CA-Toronto');
INSERT INTO PaidUser2 (postalCode, country, city) VALUES ('11511', 'Egypt', 'EG-Cairo');
INSERT INTO PaidUser2 (postalCode, country, city) VALUES ('34000', 'Turkey', 'TR-Istanbul');
INSERT INTO PaidUser2 (postalCode, country, city) VALUES ('10100', 'Thailand', 'TH-Bangkok');
INSERT INTO PaidUser2 (postalCode, country, city) VALUES ('12345', 'United Arab Emirates', 'AE-Dubai');

-- Add PaidUser1 HERE

INSERT INTO PaidUser1 (userid, postalCode, country, tid) VALUES (1, '20040-010', 'Brazil', 1);
INSERT INTO PaidUser1 (userid, postalCode, country, tid) VALUES (2, '100-0001', 'Japan', 2);
INSERT INTO PaidUser1 (userid, postalCode, country, tid) VALUES (3, '2000', 'Australia', 3);
INSERT INTO PaidUser1 (userid, postalCode, country, tid) VALUES (4, '2196', 'South Africa', 4);
INSERT INTO PaidUser1 (userid, postalCode, country, tid) VALUES (5, '110001', 'India', 5);
INSERT INTO PaidUser1 (userid, postalCode, country, tid) VALUES (6, '06010', 'Mexico', 1);
INSERT INTO PaidUser1 (userid, postalCode, country, tid) VALUES (7, '101000', 'Russia', 2);
INSERT INTO PaidUser1 (userid, postalCode, country, tid) VALUES (8, '11564', 'Saudi Arabia', 3);
INSERT INTO PaidUser1 (userid, postalCode, country, tid) VALUES (9, 'C1002AAP', 'Argentina', 4);
INSERT INTO PaidUser1 (userid, postalCode, country, tid) VALUES (10, '100010', 'China', 5);
INSERT INTO PaidUser1 (userid, postalCode, country, tid) VALUES (11, '00100', 'Italy', 1);
INSERT INTO PaidUser1 (userid, postalCode, country, tid) VALUES (12, '900001', 'Nigeria', 2);
INSERT INTO PaidUser1 (userid, postalCode, country, tid) VALUES (13, '111 20', 'Sweden', 3);
INSERT INTO PaidUser1 (userid, postalCode, country, tid) VALUES (14, '03187', 'South Korea', 4);
INSERT INTO PaidUser1 (userid, postalCode, country, tid) VALUES (15, '75001', 'France', 5);
INSERT INTO PaidUser1 (userid, postalCode, country, tid) VALUES (16, 'M5A 1A1', 'Canada', 1);
INSERT INTO PaidUser1 (userid, postalCode, country, tid) VALUES (17, '11511', 'Egypt', 2);
INSERT INTO PaidUser1 (userid, postalCode, country, tid) VALUES (18, '34000', 'Turkey', 3);
INSERT INTO PaidUser1 (userid, postalCode, country, tid) VALUES (19, '10100', 'Thailand', 4);
INSERT INTO PaidUser1 (userid, postalCode, country, tid) VALUES (20, '12345', 'United Arab Emirates', 5);

INSERT INTO Exercise (name, etype) VALUES ('Barbell Front Squat', 'Resistance/Conditioning');
INSERT INTO Exercise (name, etype) VALUES ('Barbell Back Squat', 'Resistance/Conditioning');
INSERT INTO Exercise (name, etype) VALUES ('Barbell Bench Press', 'Resistance/Conditioning');
INSERT INTO Exercise (name, etype) VALUES ('Deadlifts', 'Resistance/Conditioning');
INSERT INTO Exercise (name, etype) VALUES ('Lat pulldowns', 'Resistance/Conditioning');
INSERT INTO Exercise (name, etype) VALUES ('Suicides', 'Cardio');
INSERT INTO Exercise (name, etype) VALUES ('100m dash', 'Cardio');
INSERT INTO Exercise (name, etype) VALUES ('5k run', 'Cardio');
INSERT INTO Exercise (name, etype) VALUES ('1 mile run', 'Cardio');
INSERT INTO Exercise (name, etype) VALUES ('jumping ropes', 'Cardio');
INSERT INTO Exercise (name, etype) VALUES ('30 min swim', 'Cardio');
INSERT INTO Exercise (name, etype) VALUES ('freestyle strokes', 'Swimming');
INSERT INTO Exercise (name, etype) VALUES ('Backstrokes', 'Swimming');
INSERT INTO Exercise (name, etype) VALUES ('Butterfly strokes', 'Swimming');
INSERT INTO Exercise (name, etype) VALUES ('Breaststrokes', 'Swimming');
INSERT INTO Exercise (name, etype) VALUES ('Downward Dog', 'Yoga');
INSERT INTO Exercise (name, etype) VALUES ('Cat', 'Yoga');
INSERT INTO Exercise (name, etype) VALUES ('Cow', 'Yoga');
INSERT INTO Exercise (name, etype) VALUES ('Warrior 1', 'Yoga');
INSERT INTO Exercise (name, etype) VALUES ('Warrior 2', 'Yoga');
INSERT INTO Exercise (name, etype) VALUES ('Brazilian Jui Jitsu (No Gi)', 'Martial Arts');
INSERT INTO Exercise (name, etype) VALUES ('Wrestling', 'Martial Arts');
INSERT INTO Exercise (name, etype) VALUES ('Muay Thai', 'Martial Arts');
INSERT INTO Exercise (name, etype) VALUES ('Boxing', 'Martial Arts');
INSERT INTO Exercise (name, etype) VALUES ('Transition work', 'Martial Arts');
INSERT INTO Exercise (name, etype) VALUES ('Takedown defence', 'Martial Arts');

-- Add ExercisePlan Here
INSERT INTO ExercisePlan (plantype, tid, userid) VALUES ('Exercise Plan 1: Cardio', 2, 1);
INSERT INTO ExercisePlan (plantype, tid, userid) VALUES ('Exercise Plan 2: Martial Arts', 3, 2);
INSERT INTO ExercisePlan (plantype, tid, userid) VALUES ('Exercise Plan 3: Yoga', 4, 3);
INSERT INTO ExercisePlan (plantype, tid, userid) VALUES ('Exercise Plan 4: HIIT', 5, 4);
INSERT INTO ExercisePlan (plantype, tid, userid) VALUES ('Exercise Plan 5: Cycling', 1, 5);
INSERT INTO ExercisePlan (plantype, tid, userid) VALUES ('Exercise Plan 6: Strength training', 2, 6);
INSERT INTO ExercisePlan (plantype, tid, userid) VALUES ('Exercise Plan 7: Swimming', 3, 7);
INSERT INTO ExercisePlan (plantype, tid, userid) VALUES ('Exercise Plan 8: CrossFit', 4, 8);
INSERT INTO ExercisePlan (plantype, tid, userid) VALUES ('Exercise Plan 9: Yoga', 5, 9);
INSERT INTO ExercisePlan (plantype, tid, userid) VALUES ('Exercise Plan 10: Cardio', 1, 10);
INSERT INTO ExercisePlan (plantype, tid, userid) VALUES ('Exercise Plan 11: Martial Arts', 2, 11);
INSERT INTO ExercisePlan (plantype, tid, userid) VALUES ('Exercise Plan 12: Strength training', 3, 12);
INSERT INTO ExercisePlan (plantype, tid, userid) VALUES ('Exercise Plan 13: HIIT', 4, 13);
INSERT INTO ExercisePlan (plantype, tid, userid) VALUES ('Exercise Plan 14: CrossFit', 5, 14);
INSERT INTO ExercisePlan (plantype, tid, userid) VALUES ('Exercise Plan 15: Yoga', 1, 15);
INSERT INTO ExercisePlan (plantype, tid, userid) VALUES ('Exercise Plan 16: Swimming', 2, 16);
INSERT INTO ExercisePlan (plantype, tid, userid) VALUES ('Exercise Plan 17: Cardio', 3, 17);
INSERT INTO ExercisePlan (plantype, tid, userid) VALUES ('Exercise Plan 18: Cycling', 4, 18);
INSERT INTO ExercisePlan (plantype, tid, userid) VALUES ('Exercise Plan 19: Martial Arts', 5, 19);
INSERT INTO ExercisePlan (plantype, tid, userid) VALUES ('Exercise Plan 20: Strength training', 1, 20);

INSERT INTO Nutrition (carbs, fats, protein, calories, userid) VALUES (100, 100, 100, 2200, 1);
INSERT INTO Nutrition (carbs, fats, protein, calories, userid) VALUES (150, 100, 80, 2400, 2);
INSERT INTO Nutrition (carbs, fats, protein, calories, userid) VALUES (220, 60, 120, 2300, 3);
INSERT INTO Nutrition (carbs, fats, protein, calories, userid) VALUES (280, 50, 90, 2400, 4);
INSERT INTO Nutrition (carbs, fats, protein, calories, userid) VALUES (120, 80, 120, 2800, 5);
INSERT INTO Nutrition (carbs, fats, protein, calories, userid) VALUES (180, 100, 100, 3200, 6);
INSERT INTO Nutrition (carbs, fats, protein, calories, userid) VALUES (10, 12, 18, 200, 7);
INSERT INTO Nutrition (carbs, fats, protein, calories, userid) VALUES (15, 8, 14, 180, 8);
INSERT INTO Nutrition (carbs, fats, protein, calories, userid) VALUES (9, 16, 20, 220, 9);
INSERT INTO Nutrition (carbs, fats, protein, calories, userid) VALUES (13, 10, 15, 190, 10);
INSERT INTO Nutrition (carbs, fats, protein, calories, userid) VALUES (18, 7, 12, 170, 11);
INSERT INTO Nutrition (carbs, fats, protein, calories, userid) VALUES (14, 9, 16, 210, 12);
INSERT INTO Nutrition (carbs, fats, protein, calories, userid) VALUES (12, 14, 17, 195, 13);
INSERT INTO Nutrition (carbs, fats, protein, calories, userid) VALUES (20, 11, 13, 185, 14);
INSERT INTO Nutrition (carbs, fats, protein, calories, userid) VALUES (8, 18, 19, 230, 15);
INSERT INTO Nutrition (carbs, fats, protein, calories, userid) VALUES (16, 15, 10, 160, 16);
INSERT INTO Nutrition (carbs, fats, protein, calories, userid) VALUES (19, 13, 11, 175, 17);
INSERT INTO Nutrition (carbs, fats, protein, calories, userid) VALUES (7, 20, 14, 205, 18);
INSERT INTO Nutrition (carbs, fats, protein, calories, userid) VALUES (19, 13, 11, 175, 19);
INSERT INTO Nutrition (carbs, fats, protein, calories, userid) VALUES (7, 20, 14, 205, 20);

INSERT INTO Goals (category, weight, din, userid) VALUES ('Weight Loss', 100, '2023-Dec-31', 1);
INSERT INTO Goals (category, weight, din, userid) VALUES ('Fitness', 45, '2023-Jan-21', 2);
INSERT INTO Goals (category, weight, din, userid) VALUES ('Weight Loss', 80, '2023-Feb-2', 3);
INSERT INTO Goals (category, weight, din, userid) VALUES ('Muscle Gain', 50, '2023-Mar-18', 4);
INSERT INTO Goals (category, weight, din, userid) VALUES ('Endurance', 66, '2023-Apr-3', 5);
INSERT INTO Goals (category, weight, din, userid) VALUES ('Maintain Weight', 60, '2023-May-28', 6);
INSERT INTO Goals (category, weight, din, userid) VALUES ('Toning', 65, '2023-Jun-20', 7);
INSERT INTO Goals (category, weight, din, userid) VALUES ('Agility', 49, '2023-Jan-11', 8);
INSERT INTO Goals (category, weight, din, userid) VALUES ('Bodybuilding', 70, '2023-Jul-21', 9);
INSERT INTO Goals (category, weight, din, userid) VALUES ('Posture Improvement', 58, '2023-Mar-30', 10);
INSERT INTO Goals (category, weight, din, userid) VALUES ('CrossFit', 78, '2023-Apr-12', 11);
INSERT INTO Goals (category, weight, din, userid) VALUES ('Balance Training', 67, '2023-May-25', 12);
INSERT INTO Goals (category, weight, din, userid) VALUES ('Rehabilitation', 85, '2023-Jan-13', 13);
INSERT INTO Goals (category, weight, din, userid) VALUES ('Speed Training', 56, '2023-Jul-3', 14);
INSERT INTO Goals (category, weight, din, userid) VALUES ('Functional Fitness', 63, '2023-Feb-15', 15);
INSERT INTO Goals (category, weight, din, userid) VALUES ('Powerlifting', 82, '2023-Mar-17', 16);
INSERT INTO Goals (category, weight, din, userid) VALUES ('Circuit Training', 68, '2023-Apr-21', 17);

INSERT INTO Ad (company, url) VALUES ('Google', 'https://www.google.com');
INSERT INTO Ad (company, url) VALUES ('Apple', 'https://www.apple.com');
INSERT INTO Ad (company, url) VALUES ('Microsoft', 'https://www.microsoft.com');
INSERT INTO Ad (company, url) VALUES ('Amazon', 'https://www.amazon.com');
INSERT INTO Ad (company, url) VALUES ('Facebook', 'https://www.facebook.com');
INSERT INTO Ad (company, url) VALUES ('Tesla', 'https://www.tesla.com');
INSERT INTO Ad (company, url) VALUES ('Netflix', 'https://www.netflix.com');
INSERT INTO Ad (company, url) VALUES ('Twitter', 'https://www.twitter.com');
INSERT INTO Ad (company, url) VALUES ('IBM', 'https://www.ibm.com');
INSERT INTO Ad (company, url) VALUES ('Salesforce', 'https://www.salesforce.com');
INSERT INTO Ad (company, url) VALUES ('Adobe', 'https://www.adobe.com');
INSERT INTO Ad (company, url) VALUES ('Intel', 'https://www.intel.com');
INSERT INTO Ad (company, url) VALUES ('Cisco', 'https://www.cisco.com');
INSERT INTO Ad (company, url) VALUES ('HP', 'https://www.hp.com');
INSERT INTO Ad (company, url) VALUES ('Oracle', 'https://www.oracle.com');
INSERT INTO Ad (company, url) VALUES ('Uber', 'https://www.uber.com');
INSERT INTO Ad (company, url) VALUES ('Airbnb', 'https://www.airbnb.com');
INSERT INTO Ad (company, url) VALUES ('Spotify', 'https://www.spotify.com');
INSERT INTO Ad (company, url) VALUES ('Dropbox', 'https://www.dropbox.com');
INSERT INTO Ad (company, url) VALUES ('Slack', 'https://www.slack.com');

INSERT INTO Content (url, author) VALUES ('https://www.youtube.com/watch?v=wWGulLAa0O0', 'British Heart Foundation');
INSERT INTO Content (url, author) VALUES ('https://www.youtube.com/watch?v=Mot-8b8szJI', 'Science Animated');
INSERT INTO Content (url, author) VALUES ('https://www.youtube.com/watch?v=4WV7kAUGrgI', 'The Mike Hansen Show');
INSERT INTO Content (url, author) VALUES ('https://www.youtube.com/watch?v=Wto7zISB2d0', 'Braive');
INSERT INTO Content (url, author) VALUES ('https://www.youtube.com/watch?v=tWYFndopVl8', 'NationwideChildrens');
INSERT INTO Content (url, author) VALUES ('https://www.youtube.com/watch?v=5znuV7Iyrzs', 'Meghan Livingstone');
INSERT INTO Content (url, author) VALUES ('https://www.youtube.com/watch?v=XulBKrrRC3k', 'Pick Up Limes');
INSERT INTO Content (url, author) VALUES ('https://www.youtube.com/watch?v=zJgHbifIx-Q', 'Johns Hopkins Medicine');
INSERT INTO Content (url, author) VALUES ('https://www.youtube.com/watch?v=zdjWnvbaUZo', 'Med Today');
INSERT INTO Content (url, author) VALUES ('https://www.youtube.com/watch?v=j4iQkKYFH1E', 'Liezl Jayne Strydom');
INSERT INTO Content (url, author) VALUES ('https://www.youtube.com/watch?v=gC_L9qAHVJ8', 'Body Project');
INSERT INTO Content (url, author) VALUES ('https://www.youtube.com/watch?v=3SpPraOLJl4', 'Body Project');
INSERT INTO Content (url, author) VALUES ('https://www.youtube.com/watch?v=MjMkBaqimFo', 'National Institute on Aging');
INSERT INTO Content (url, author) VALUES ('https://www.youtube.com/watch?v=fRDccGSLE9k', 'Oasis Mental Health Applications');
INSERT INTO Content (url, author) VALUES ('https://www.youtube.com/watch?v=37UhELFvPec', 'TEDx Talks');
INSERT INTO Content (url, author) VALUES ('https://www.youtube.com/watch?v=XqTcye_acTI', 'Doctor Mike Hansen');
INSERT INTO Content (url, author) VALUES ('https://www.youtube.com/watch?v=BHY0FxzoKZE', 'TED');
INSERT INTO Content (url, author) VALUES ('https://www.youtube.com/watch?v=inEPlZZ_SfA', 'Bestie');
INSERT INTO Content (url, author) VALUES ('https://www.youtube.com/watch?v=VhVqz4KuEgI', 'Dr. Eric Berg DC');
INSERT INTO Content (url, author) VALUES ('https://www.youtube.com/watch?v=GIqW2qds3qI', 'Coach Viva');

INSERT INTO Notifications (userid, msg) VALUES (1, 'Celebrate victories. Every step is a step toward health!');
INSERT INTO Notifications (userid, msg) VALUES (2, 'Sunshine boosts mood. Get outside for fresh air.');
INSERT INTO Notifications (userid, msg) VALUES (3, 'Listen to your body. Rest when feeling fatigued.');
INSERT INTO Notifications (userid, msg) VALUES (4, 'Laugh often! Laughter has health benefits.');
INSERT INTO Notifications (userid, msg) VALUES (5, 'Prioritize self-care. Take time to recharge daily.');
INSERT INTO Notifications (userid, msg) VALUES (6, 'Build support. Workout buddies keep you accountable.');
INSERT INTO Notifications (userid, msg) VALUES (7, 'Stay consistent. Small habits lead to big results.');
INSERT INTO Notifications (userid, msg) VALUES (8, 'Hydrate with herbal teas for added flavor and benefits.');
INSERT INTO Notifications (userid, msg) VALUES (9, 'Quality sleep fuels recovery. Aim for 7-9 hours nightly.');
INSERT INTO Notifications (userid, msg) VALUES (10, 'Posture matters. Sit up straight, stand tall, support your spine.');
INSERT INTO Notifications (userid, msg) VALUES (11, 'New goals, new challenges. Push your limits, see progress.');
INSERT INTO Notifications (userid, msg) VALUES (12, 'Outdoor workouts boost mood. Find joy in movement.');
INSERT INTO Notifications (userid, msg) VALUES (13, 'Cardio and strength for diversity. Keep workouts effective.');
INSERT INTO Notifications (userid, msg) VALUES (14, 'Stay hydrated with infused water. Delicious and healthy.');

INSERT INTO PlanIncludes (epid, eid) VALUES (1, 1);
INSERT INTO PlanIncludes (epid, eid) VALUES (1, 2);
INSERT INTO PlanIncludes (epid, eid) VALUES (1, 3);
INSERT INTO PlanIncludes (epid, eid) VALUES (1, 4);
INSERT INTO PlanIncludes (epid, eid) VALUES (2, 2);
INSERT INTO PlanIncludes (epid, eid) VALUES (3, 2);
INSERT INTO PlanIncludes (epid, eid) VALUES (4, 1);
INSERT INTO PlanIncludes (epid, eid) VALUES (5, 6);
INSERT INTO PlanIncludes (epid, eid) VALUES (6, 3);
INSERT INTO PlanIncludes (epid, eid) VALUES (7, 10);
INSERT INTO PlanIncludes (epid, eid) VALUES (8, 15);
INSERT INTO PlanIncludes (epid, eid) VALUES (9, 14);
INSERT INTO PlanIncludes (epid, eid) VALUES (10, 10);
INSERT INTO PlanIncludes (epid, eid) VALUES (11, 1);
INSERT INTO PlanIncludes (epid, eid) VALUES (12, 12);
INSERT INTO PlanIncludes (epid, eid) VALUES (13, 22);
INSERT INTO PlanIncludes (epid, eid) VALUES (14, 23);
INSERT INTO PlanIncludes (epid, eid) VALUES (15, 12);
INSERT INTO PlanIncludes (epid, eid) VALUES (16, 12);
INSERT INTO PlanIncludes (epid, eid) VALUES (17, 12);
INSERT INTO PlanIncludes (epid, eid) VALUES (18, 5);
INSERT INTO PlanIncludes (epid, eid) VALUES (19, 7);
INSERT INTO PlanIncludes (epid, eid) VALUES (20, 9);

INSERT INTO ProgressReport (satisfaction, reportDate, userid) VALUES ('Successful', 1);
INSERT INTO ProgressReport (satisfaction, reportDate, userid) VALUES ('Moderately Happy', 2);
INSERT INTO ProgressReport (satisfaction, reportDate, userid) VALUES ('Ok', 3);
INSERT INTO ProgressReport (satisfaction, reportDate, userid) VALUES ('Perfect', 4);
INSERT INTO ProgressReport (satisfaction, reportDate, userid) VALUES ('No Progress', 5);
INSERT INTO ProgressReport (satisfaction, reportDate, userid) VALUES ('Regression', 6);

INSERT INTO GoalReports (gid, pid) VALUES (1, 1);
INSERT INTO GoalReports (gid, pid) VALUES (1, 2);
INSERT INTO GoalReports (gid, pid) VALUES (1, 3);
INSERT INTO GoalReports (gid, pid) VALUES (2, 1);
INSERT INTO GoalReports (gid, pid) VALUES (2, 3);
INSERT INTO GoalReports (gid, pid) VALUES (3, 2);
INSERT INTO GoalReports (gid, pid) VALUES (1, 1);
INSERT INTO GoalReports (gid, pid) VALUES (1, 2);
INSERT INTO GoalReports (gid, pid) VALUES (1, 3);
INSERT INTO GoalReports (gid, pid) VALUES (2, 1);
INSERT INTO GoalReports (gid, pid) VALUES (2, 3);
INSERT INTO GoalReports (gid, pid) VALUES (3, 2);


