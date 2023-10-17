package teste;

public class Hardware {
    private String nome;
    private String especificidade;
    private Double capacidade;
    private Integer fkModeloHardware;

    public Hardware() {
    }

    public Hardware(String nome, Double capacidade, Integer fkModeloHardware) {
        this.nome = nome;
        this.especificidade = null;
        this.capacidade = capacidade;
        this.fkModeloHardware = fkModeloHardware;
    }

    public Hardware(String nome, String especificidade, Double capacidade, Integer fkModeloHardware) {
        this.nome = nome;
        this.especificidade = especificidade;
        this.capacidade = capacidade;
        this.fkModeloHardware = fkModeloHardware;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEspecificidade() {
        return especificidade;
    }

    public void setEspecificidade(String especificidade) {
        this.especificidade = especificidade;
    }

    public Double getCapacidade() {
        return capacidade;
    }

    public void setCapacidade(Double capacidade) {
        this.capacidade = capacidade;
    }

    public Integer getFkModeloHardware() {
        return fkModeloHardware;
    }

    public void setFkModeloHardware(Integer fkModeloHardware) {
        this.fkModeloHardware = fkModeloHardware;
    }

    @Override
    public String toString() {
        return "\nHardware{" +
                "nome='" + nome + '\'' +
                ", especificidade='" + especificidade + '\'' +
                ", capacidade=" + capacidade +
                ", fkModeloHardware=" + fkModeloHardware +
                '}';
    }
}
