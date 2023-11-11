//package Slack;
//
//import com.slack.api.Slack;
//import com.slack.api.methods.MethodsClient;
//import com.slack.api.methods.request.chat.ChatPostMessageRequest;
//import com.slack.api.methods.response.cha.ChatPostMessageResponse;
//
//public class SlackAlertExample {
//    public static void main(String[] args) {
//        // Substitua 'YOUR_BOT_TOKEN' pelo seu token de bot do Slack
//        String botToken = "YOUR_BOT_TOKEN";
//
//        // Crie um cliente Slack
//        Slack slack = Slack.getInstance();
//        MethodsClient methods = slack.methods(botToken);
//
//        // Configuração da mensagem a ser enviada
//        ChatPostMessageRequest messageRequest = ChatPostMessageRequest.builder()
//                .channel("#nome-do-canal") // Substitua pelo nome do canal desejado
//                .text("Este é um alerta do meu aplicativo em Java!")
//                .build();
//
//        // Envie a mensagem
//        try {
//            ChatPostMessageResponse response = methods.chatPostMessage(messageRequest);
//            if (response.isOk()) {
//                System.out.println("Mensagem enviada com sucesso!");
//            } else {
//                System.out.println("Erro: " + response.getError());
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//}
//
