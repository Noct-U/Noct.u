package aplicacao;

public class Hardware {
    private String nome;
    private String especificidade;
    private Double capacidade;
    private Integer fkTipoHardware;

    public Hardware() {
    }

    public Hardware(String nome, Double capacidade, Integer fkTipoHardware) {
        this.nome = nome;
        this.especificidade = null;
        this.capacidade = capacidade;
        this.fkTipoHardware = fkTipoHardware;
    }

    public Hardware(String nome, String especificidade, Double capacidade, Integer fkTipoHardware) {
        this.nome = nome;
        this.especificidade = especificidade;
        this.capacidade = capacidade;
        this.fkTipoHardware = fkTipoHardware;
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

    public Integer getFkTipoHardware() {
        return fkTipoHardware;
    }

    public void setFkTipoHardware(Integer fkTipoHardware) {
        this.fkTipoHardware = fkTipoHardware;
    }

    @Override
    public String toString() {
        return """
                \nNome: %s
                especificidade: %s
                capacidade: %.2f
                fkTipoHardware: %d""".formatted(nome, especificidade, capacidade, fkTipoHardware);
    }
}
