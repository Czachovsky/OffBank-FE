export interface FaqType {
    header: string;
    open: boolean;
    content: string;
}

export const faqQuestions: FaqType[] = [
    {
        header: "Ile trwa analiza mojej sprawy?",
        open: false,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer imperdiet nunc et tellus cursus, ut varius neque semper. Praesent condimentum nisi at lorem viverra, nec malesuada sem ullamcorper."
    },
    {
        header: "Jak mogę przesłać dokumenty do analizy?",
        open: true,
        content: "Możesz przesłać dokumenty bezpośrednio przez aplikację – wystarczy zalogować się, przejść do zakładki „Moje sprawy” i wybrać opcję „Prześlij dokumenty”. Dokumenty możesz dodać z telefonu lub zeskanować bezpośrednio w aplikacji, korzystając z wbudowanego skanera, który automatycznie poprawi jakość zdjęcia. Pamiętaj, aby pliki były kompletne i czytelne – to przyspieszy analizę Twojej sprawy."
    },
    {
        header: "Co się stanie, jeśli bank odrzuci ugodę?",
        open: false,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer imperdiet nunc et tellus cursus, ut varius neque semper. Praesent condimentum nisi at lorem viverra, nec malesuada sem ullamcorper."
    },
    {
        header: "Czy mogę zrezygnować z postępowania?",
        open: false,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer imperdiet nunc et tellus cursus, ut varius neque semper. Praesent condimentum nisi at lorem viverra, nec malesuada sem ullamcorper."
    },
    {
        header: "Gdzie znajdę status mojej sprawy?",
        open: false,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer imperdiet nunc et tellus cursus, ut varius neque semper. Praesent condimentum nisi at lorem viverra, nec malesuada sem ullamcorper."
    },
    {
        header: "Jak mogę skontaktować się z supportem?",
        open: false,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer imperdiet nunc et tellus cursus, ut varius neque semper. Praesent condimentum nisi at lorem viverra, nec malesuada sem ullamcorper."
    }
];
