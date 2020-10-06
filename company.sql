DROP TABLE IF EXISTS department CASCADE;
CREATE TABLE IF NOT EXISTS  department (
  dname        varchar(25) NOT NULL,
  dnumber      integer,
  mgrssn       char(9) NOT NULL, 
  mgrstartdate date,
  PRIMARY KEY (dnumber)
);

DROP TABLE IF EXISTS dept_locations CASCADE;
CREATE TABLE IF NOT EXISTS  dept_locations (
  dnumber   integer,
  dlocation varchar(15), 
  PRIMARY KEY (dnumber,dlocation),
  FOREIGN KEY (dnumber) REFERENCES department(dnumber)
);

DROP TABLE IF EXISTS employee CASCADE;
CREATE TABLE IF NOT EXISTS  employee (
  fname    varchar(15) NOT NULL, 
  minit    varchar(1),
  lname    varchar(15) NOT NULL,
  ssn      char(9),
  bdate    date,
  address  varchar(50),
  sex      char,
  salary   decimal(10,2),
  superssn char(9),
  dno      integer,
  PRIMARY KEY (ssn),
  FOREIGN KEY (superssn) REFERENCES employee(ssn),
  FOREIGN KEY (dno) REFERENCES department(dnumber)
);

DROP TABLE IF EXISTS dependent CASCADE;
CREATE TABLE IF NOT EXISTS  dependent (
  essn           char(9),
  dependent_name varchar(15),
  sex            char,
  bdate          date,
  relationship   varchar(8),
  PRIMARY KEY (essn,dependent_name),
  FOREIGN KEY (essn) REFERENCES employee(ssn)
);

DROP TABLE IF EXISTS project CASCADE;
CREATE TABLE IF NOT EXISTS  project (
  pname      varchar(25) NOT NULL,
  pnumber    integer,
  plocation  varchar(15),
  dnum       integer NOT NULL,
  PRIMARY KEY (pnumber),
  UNIQUE (pname),
  FOREIGN KEY (dnum) REFERENCES department(dnumber)
);
ISTS works_on
DROP TABLE IF EX CASCADE;
CREATE TABLE IF NOT EXISTS  works_on (
  essn   char(9),
  pno    integer,
  hours  decimal(4,1),
  PRIMARY KEY (essn,pno),
  FOREIGN KEY (essn) REFERENCES employee(ssn),
  FOREIGN KEY (pno) REFERENCES project(pnumber)
);
