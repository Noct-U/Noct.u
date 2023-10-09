import java.util.Scanner;

public class PagLogin {
    public static void main(String[] args) {

        //Variável leitura
        Scanner in = new Scanner(System.in);

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

        Boolean resultado = cliente.login(email,senha);
        cliente.resultadoLogin(resultado,email);



    }
}
