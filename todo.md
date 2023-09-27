- Realizar a gerência das dependências de desenvolvimento e de produção.

- Desinstalar a dependência pg. (talvez não será necessário).

- Verificar a viabilidade de mover o teste de conexão sql para a pasta de testes.

- Alterar tell para phone.

- Reduzir a quantidade do estoque de um livro quando houver uma compra

- O valor da compra deve ser calculado utilizando o valor dos preços dos livros (talvez não seja possível pois para realizar eu teria de alterar a estrutura do exercício proposto.)

- Padronizar o argumento client_id

- Adicionar ordenação por id quando executar um get.

- (books.controller (getBookById)) ao solicitar o mongoBook, se caso não houver informações cadastradas para o postgresqlBook, retornar um obj vazio e não um erro 404.

- Verificar modo para não aceitar campos vazios ao cadastrar as informações dos livros.