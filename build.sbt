name := """booklight"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava, PlayEbean)

libraryDependencies += javaJdbc

scalaVersion := "2.11.7"

<<<<<<< HEAD
libraryDependencies += "mysql" % "mysql-connector-java" % "5.1.36"
=======
val appDependencies = Seq(
  "ws.securesocial" %% "securesocial" % "2.1.4"
)
>>>>>>> 6c0db3705d55a3a7148c1eb4b1553e28f6839c6d

routesGenerator := StaticRoutesGenerator

libraryDependencies ++= Seq(
  javaJdbc,
  cache,
  javaWs
)
