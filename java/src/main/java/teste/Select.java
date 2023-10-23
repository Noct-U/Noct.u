package teste;

import com.sun.jna.StringArray;

public class Select {
    private String nome;
    private Double valor;
    private String dtCaptura;

    public Select() {
    }

    public Select(String nome, Double valor, String dtCaptura) {
        this.nome = nome;
        this.valor = valor;
        this.dtCaptura = dtCaptura;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public String getDtCaptura() {
        return dtCaptura;
    }

    public void setDtCaptura(String dtCaptura) {
        this.dtCaptura = dtCaptura;
    }

    @Override
    public String toString() {
        return "\n{" +
                "nome:'" + nome + '\'' +
                ", valorAtual:" + valor +
                ", dtCaptura:'" + dtCaptura + '\'' +
                '}';
    }
}
