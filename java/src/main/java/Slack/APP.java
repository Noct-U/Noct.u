package Slack;


import java.io.IOException;
import org.json.JSONObject;

/**
 *
 * @author Diego Brito <diego.lima@bandtec.com.br>
 */
public class APP {

    public static void main(String[] args) throws IOException, InterruptedException {

        JSONObject json = new JSONObject();

        json.put("text", "Iniciado");

        Slack.sendMessage(json);
    }
}