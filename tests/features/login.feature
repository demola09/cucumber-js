@login
Feature: Login
  As a user I wish to login successffully to the app.

  Scenario: Login to Levelten
    When I enter my username and password
    Then I should be logged in successffully
