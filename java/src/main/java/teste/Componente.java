package teste;

public class Componente {
    private Integer fkComputador;
    private Integer fkHardware;
    private String codigoSerial;

    public Componente() {
    }

    public Componente(Integer fkComputador, Integer fkHardware, String codigoSerial) {
        this.fkComputador = fkComputador;
        this.fkHardware = fkHardware;
        this.codigoSerial = codigoSerial;
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

    public String getCodigoSerial() {
        return codigoSerial;
    }

    public void setCodigoSerial(String codigoSerial) {
        this.codigoSerial = codigoSerial;
    }

    @Override
    public String toString() {
        return "\nComponente{" +
                "fkComputador=" + fkComputador +
                ", fkHardware=" + fkHardware +
                ", codigoSerial='" + codigoSerial + '\'' +
                '}';
    }

    public static class Captura {
        private Double valor;
        private String descricao;
        private String dtCaptura;
        private Integer fkComputador;
        private Integer fkHardware;
        private Integer fkComponente;

        public Captura() {
        }

        public Captura(Double valor, String dtCaptura, Integer fkComputador, Integer fkHardware, Integer fkComponente) {
            this.valor = valor;
            this.descricao = null;
            this.dtCaptura = dtCaptura;
            this.fkComputador = fkComputador;
            this.fkHardware = fkHardware;
            this.fkComponente = fkComponente;
        }

        public Captura(Double valor, String descricao, String dtCaptura, Integer fkComputador, Integer fkHardware, Integer fkComponente) {
            this.valor = valor;
            this.descricao = descricao;
            this.dtCaptura = dtCaptura;
            this.fkComputador = fkComputador;
            this.fkHardware = fkHardware;
            this.fkComponente = fkComponente;
        }

        public Double getValor() {
            return valor;
        }

        public void setValor(Double valor) {
            this.valor = valor;
        }

        public String getDescricao() {
            return descricao;
        }

        public void setDescricao(String descricao) {
            this.descricao = descricao;
        }

        public String getDtCaptura() {
            return dtCaptura;
        }

        public void setDtCaptura(String dtCaptura) {
            this.dtCaptura = dtCaptura;
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

        public Integer getFkComponente() {
            return fkComponente;
        }

        public void setFkComponente(Integer fkComponente) {
            this.fkComponente = fkComponente;
        }

        @Override
        public String toString() {
            return "\ncaptura{" +
                    "valor=" + valor +
                    ", descricao='" + descricao + '\'' +
                    ", dtCaptura='" + dtCaptura + '\'' +
                    ", fkComputador=" + fkComputador +
                    ", fkHardware=" + fkHardware +
                    ", fkComponente=" + fkComponente +
                    '}';
        }
    }
}
