class Utilitario {

    formatarData(data: string | Date): string {
        return new Date(data).toLocaleDateString("pt-br", { timeZone: "UTC" });
    }


    formatarParaReal(valor: number): string {
        return new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    }


    formatarDataParaInput(data: string | Date | undefined): string {
        if (!data) return '';
        const d = new Date(data);
        return d.toISOString().split('T')[0];
    }


    async erroDaResposta(resposta: Response): Promise<Error> {
        const corpo = await resposta.json().catch(() => ({}));
        return new Error(corpo.mensagem || `Erro ${resposta.status}: ${resposta.statusText}`);
    }

    mensagemDeErro(error: unknown): string {
        return error instanceof Error ? error.message : "Erro inesperado.";
    }
}

export default new Utilitario;