# Case: Front-end

Uma empresa de monitoramento de risco irá implementar em seu ambiente de produção um sistema de classificação de risco
eminente baseados em datastream de vídeos. O foco da aplicação é conseguir identificar, de forma automática, o risco eminente
dos colaboradores. Para mitigar os problemas reportados pelo cliente, propomos nessa atividade a criação de dois sistemas. O
sistema “A” contendo um MOCK da API (Back-end da aplicação) e o sistema “B” focado em IHC (Interação humano–computador)
para o desenvolvimento do “front-end", baseado em React, que consumirá a API e servirá de monitoramento de risco para os
gestores da empresa.

## Pré-requisitos

- Git
- Docker

## Execução

Clone e acesse o repositório

```
git clone git@github.com:nakahwra/senai-case.git
cd senai-case
```

Crie a imagem do projeto

```
docker build -t nakahara-senai-case .
```

Execute o container

```
docker run -d -p 8080:8080 --name nakahara-senai-case nakahara-senai-case
```

Acesse a aplicação através da porta especificada

```
http://localhost:8080/
```
