Queimap API
API para aplicação web sobre a cidade de Queimadas-PB.

Dependências

Java 17
Maven-4.0.0
PostgreSQL 14

Execução do Projeto Backend

# Clonar o repositório
git clone https://github.com/PabloSelares/Queimap.git

# Entrar na pasta do projeto
cd api

# Instalar as dependências

## linux ou mac
mvnw.cmd clean install

## windows
./mvnw clean install

# Executar a aplicação
./mvnw spring-boot:run


Depois de rodar, a API estará disponível em: http://localhost:8080