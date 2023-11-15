package pagsUsuario;

import dao.Conexao;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.lang.UsesSunHttpServer;

import java.util.List;
import java.util.Scanner;

public class PagLogin {
    public static void main(String[] args) {
        //Variável leitura
        Scanner in = new Scanner(System.in);

        //Instância conexão
        Conexao conexao = new Conexao();
        JdbcTemplate con = conexao.getConexaoDoBanco();

        //Chamada da classe usuário
        Usuario cliente = new Usuario();
        System.out.println(String.format("""
                 *************************
                *                        *
                *   Bem Vindo ao NOCT.u  *
                *                        *
                 *************************
                """));

        System.out.println("Digíte seu usuário:");
        String email = in.nextLine();

        System.out.println("Digíte sua senha:");
        String senha = in.nextLine();

        Boolean resultadoLogin = cliente.login(con,cliente,email,senha);
        cliente.resultadoLogin(resultadoLogin,email);


    }
}
