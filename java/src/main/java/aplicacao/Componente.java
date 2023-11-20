package aplicacao;

public class Componente {
    private Integer fkComputador;
    private Integer fkHardware;

    public Componente() {
    }

    public Componente(Integer fkComputador, Integer fkHardware) {
        this.fkComputador = fkComputador;
        this.fkHardware = fkHardware;
    }

    public Integer getFkComputador() {
        return fkComputador;
    }

    public void setFkComputador(Integer fkComputador) {
        this.fkComputador = fkComputador;
    }

    public Integer getFkHardware() {
        return fkHardware;
    }

    public void setFkHardware(Integer fkHardware) {
        this.fkHardware = fkHardware;
    }

    @Override
    public String toString() {
        return """
                \nfkComputador: %s
                fkHardware: %s""".formatted(fkComputador, fkHardware);
    }
}
