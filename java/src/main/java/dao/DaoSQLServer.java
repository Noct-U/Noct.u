package dao;

import jdbc.ConexaoSQLServer;
import org.springframework.jdbc.core.JdbcTemplate;

public class DaoSQLServer {
    ConexaoSQLServer conexao = new ConexaoSQLServer();
    JdbcTemplate con = conexao.getConexaoDoBanco();

    public DaoSQLServer() {
        this.conexao = conexao;
        this.con = con;
    }
}
