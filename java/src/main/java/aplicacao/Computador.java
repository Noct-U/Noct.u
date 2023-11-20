package aplicacao;

public class Computador {
    private String nome;
    private Integer fkEmpresa;
    private Integer fkModeloComputador;
    private Integer fkEmpresaLocataria;
    private Integer fkStatus;

    public Computador() {
    }

    public Computador(String nome, Integer fkEmpresa, Integer fkModeloComputador, Integer fkEmpresaLocataria, Integer fkStatus) {
        this.nome = nome;
        this.fkEmpresa = fkEmpresa;
        this.fkModeloComputador = fkModeloComputador;
        this.fkEmpresaLocataria = fkEmpresaLocataria;
        this.fkStatus = fkStatus;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getFkEmpresa() {
        return fkEmpresa;
    }

    public void setFkEmpresa(Integer fkEmpresa) {
        this.fkEmpresa = fkEmpresa;
    }

    public Integer getFkModeloComputador() {
        return fkModeloComputador;
    }

    public void setFkModeloComputador(Integer fkModeloComputador) {
        this.fkModeloComputador = fkModeloComputador;
    }

    public Integer getFkEmpresaLocataria() {
        return fkEmpresaLocataria;
    }

    public void setFkEmpresaLocataria(Integer fkEmpresaLocataria) {
        this.fkEmpresaLocataria = fkEmpresaLocataria;
    }

    public Integer getFkStatus() {
        return fkStatus;
    }

    public void setFkStatus(Integer fkStatus) {
        this.fkStatus = fkStatus;
    }

    @Override
    public String toString() {
        return """
                \nnome: %s
                fkEmpresa: %d
                fkModeloComputador: %s
                fkEmpresaLocataria: %d
                fkStatus: %d""".formatted(nome, fkEmpresa, fkModeloComputador, fkEmpresaLocataria, fkStatus);
    }
}
