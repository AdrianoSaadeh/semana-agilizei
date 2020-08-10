Feature: Listagem

     Como usuario, desejo acessar a Listagem
     Para que possa visualizar meus dados de cadastro

     Scenario: Listagem sem registros
        Given que o site nao possui registros
        When acessar a listagem
        Then devo ver a listagem vazia

     Scenario: Listagem com apenas um registro
        Given que o site possui apenas um registro
        When acessar a listagem
        Then devo ver a slitagem com apenas um registro