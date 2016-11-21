name := """booklight"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava, PlayEbean)

libraryDependencies += javaJdbc

scalaVersion := "2.11.7"

routesGenerator := StaticRoutesGenerator

libraryDependencies ++= Seq(
  javaJdbc,
  cache,
  javaWs
)
