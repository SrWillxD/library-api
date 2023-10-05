- Realizar a gerência das dependências de desenvolvimento e de produção.

- Desinstalar a dependência pg. (talvez não será necessário).

- Verificar a viabilidade de mover o teste de conexão sql para a pasta de testes.

- Alterar tell para phone.

- Reduzir a quantidade do estoque de um livro quando houver uma compra - FEITO

- O valor da compra deve ser calculado utilizando o valor dos preços dos livros (talvez não seja possível pois para realizar eu teria de alterar a estrutura do exercício proposto.) - FEITO

- Padronizar o argumento client_id

- Adicionar ordenação por id quando executar um get.

- (books.controller (getBookById)) ao solicitar o mongoBook, se caso não houver informações cadastradas para o postgresqlBook, retornar um obj vazio e não um erro 404. - Não se faz necessário.

- Verificar modo para não aceitar campos vazios ao cadastrar as informações dos livros.

- Os seguintes endpoints somente podem ser acessados pelo usuário admin:
/registerauthor - FEITO
/updateauthor/:id - FEITO
/deleteAuthor/:author_id - FEITO
getallauthors - FEITO
/getauthorbyid/:author_id - FEITO

/registerbook - FEITO
/updatebook/:book_id - FEITO
/deletebook/:book_id - FEITO
/getBookbyid/:bookId - FEITO
/addbookinfo - FEITO
/updatebookinfo - FEITO
/deletebookinfo/:bookId - FEITO
/deletereview/:bookId/:position - FEITO

/registerclient - FEITO
/updateclient/:id - FEITO
/deleteclient/:client_id - FEITO
/getallclients - FEITO
/getclientbyid/:client_id - FEITO

/getsalebyid/:saleId - FEITO
/getallsales - FEITO
/getsalesbybook/:bookId - FEITO
/getsalesbyauthor/:authorId - FEITO


Restando assim os endpoints que podem ser acessados por usuários ordinarios:
/getallbooks
/getBookbyid/:bookId
/getbooksbyauthor/:authorId
/addreview

/registerasale (Somente estar autorizado a registrar uma venda em seu prórpio nome)
/getsalesbyclient/:clientId (Somente estar autorizado a buscar vendas em seu prorio nome)