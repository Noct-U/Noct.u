package teste.bot;

import org.json.JSONObject;
import teste.Hardware;

import java.io.IOException;

public class BotSlack {

    public void mensagemHardware(String Componente) throws IOException, InterruptedException {

        String mensagemSlack = "O componente " + Componente + " atingiu/ultrapassou o limite estabelecido pelo ADM";

        JSONObject json = new JSONObject();

        json.put("text",mensagemSlack);

        ConfBotSlack.sendMessage(json);
    }


}
