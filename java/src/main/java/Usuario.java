public class Usuario {
    Boolean login(String usuario, String senha){
        if(usuario.equals("Admin") && senha.equals("123")){
           return true;
        }
        else{
            return false;
        }
    }

    void resultadoLogin(Boolean resultado,String usuario){

        if (resultado == true){

            //MENSAGEM BONITINHA
            System.out.println("**********************");

            System.out.println(
                 String.format("   Login Realizado\n " +
                               "         Com\n" +
                               "        Sucesso\n" +
                               "*** Bem vindo %s ***",usuario));

            System.out.println("**********************");
        }
        else {
            System.out.println("HOUVE UM ERRO:\nLogin ou senha inválidos");
        }
    }
}
