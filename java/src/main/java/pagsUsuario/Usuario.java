//package pagsUsuario;
//
//import org.springframework.dao.EmptyResultDataAccessException;
//import org.springframework.jdbc.core.BeanPropertyRowMapper;
//import org.springframework.jdbc.core.JdbcTemplate;
//
//import java.util.List;
//
//public class Usuario {
//    private String email;
//    private String senha;
//
//    public Usuario(){}
//
//    public Usuario(String email, String senha){
//        this.email = email;
//        this.senha = senha;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getSenha() {
//        return senha;
//    }
//
//    public void setSenha(String senha) {
//        this.senha = senha;
//    }
//
//    public Boolean login(JdbcTemplate con,Usuario usuario, String email, String senha){
//        try {
//            usuario = con.queryForObject("SELECT * FROM usuario WHERE email LIKE ? AND senha LIKE ?", new BeanPropertyRowMapper<>(Usuario.class), email, senha);
//            System.out.println(usuario);
//            return true; // O usuário foi encontrado
//        } catch (EmptyResultDataAccessException e) {
//            // Nenhum usuário foi encontrado
//            return false;
//        }
//    }
//
//    void resultadoLogin(Boolean resultado,String usuario){
//
//        if (resultado == true){
//
//            //MENSAGEM BONITINHA
//            System.out.println("**********************");
//
//            System.out.println(
//                 String.format("   Login Realizado\n " +
//                               "         Com\n" +
//                               "        Sucesso\n" +
//                               "*** Bem vindo %s ***",usuario));
//
//            System.out.println("**********************");
//        }
//        else {
//            System.out.println("HOUVE UM ERRO:\nLogin ou senha inválidos");
//        }
//    }
//
//    @Override
//    public String toString() {
//        return "Usuario{" +
//                "email='" + email + '\'' +
//                ", senha='" + senha + '\'' +
//                '}';
//    }
//}
