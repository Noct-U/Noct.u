package jdbc;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class ConexaoSQLServer {
    private JdbcTemplate conexaoDoBanco;

    public ConexaoSQLServer() {
        BasicDataSource dataSource = new BasicDataSource();
        /*
             Exemplo de driverClassName:
                com.mysql.cj.jdbc.Driver <- EXEMPLO PARA MYSQL
                com.microsoft.sqlserver.jdbc.SQLServerDriver <- EXEMPLO PARA SQL SERVER
        */
        dataSource.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        /*
             Exemplo de string de conexões:
                jdbc:mysql://localhost:3306/mydb <- EXEMPLO PARA MYSQL
                jdbc:sqlserver://localhost:1433;database=mydb <- EXEMPLO PARA SQL SERVER
        */
        dataSource.setUrl("jdbc:sqlserver://localhost:1433;database=mydb"); //ATUALIZAR ESSE CAMINHO DEPOIS
        dataSource.setUsername("aluno");                                    //ATUALIZAR ESSE CAMINHO DEPOIS
        dataSource.setPassword("aluno");                                    //ATUALIZAR ESSE CAMINHO DEPOIS

        conexaoDoBanco = new JdbcTemplate(dataSource);
    }

    public JdbcTemplate getConexaoDoBanco() {
        return conexaoDoBanco;
    }
}
