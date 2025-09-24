export interface FaqType {
    header: string;
    open: boolean;
    content: string;
}

export const faqQuestions: FaqType[] = [
    {
        header: "Ile trwa analiza mojej sprawy?",
        open: false,
        content: "Wstępna analiza odbywa się automatycznie przez nasz system AI i wynik otrzymujesz w czasie rzeczywistym. Oznacza to, że od razu po wgraniu umowy dowiesz się, czy zawiera ona klauzule abuzywne. Dzięki temu oszczędzasz czas i szybko podejmujesz decyzję, czy chcesz przejść dalej."
    },
    {
        header: "Jak mogę przesłać dokumenty do analizy?",
        open: true,
        content: "Wystarczy wgrać umowę kredytową w aplikacji OffKredyt – to szybkie i bezpieczne. Wszystkie pliki są szyfrowane, aby Twoje dane były w pełni chronione. Proces trwa tylko kilka chwil i od razu otrzymujesz wstępny wynik."
    },
    {
        header: "Co się stanie, jeśli bank odrzuci ugodę?",
        open: false,
        content: "Jeśli ugoda nie zostanie zaakceptowana, nasze kancelarie przedstawią Ci dalsze możliwe kroki, w tym drogę sądową. Zawsze otrzymasz jasne informacje o dostępnych opcjach. Dzięki temu masz pełną kontrolę nad dalszym przebiegiem sprawy."
    },
    {
        header: "Czy mogę zrezygnować z postępowania?",
        open: false,
        content: "Tak, możesz zrezygnować na każdym etapie – decyzja zawsze należy do Ciebie. Wystarczy zgłosić rezygnację poprzez aplikację lub kontakt z naszym zespołem. Chcemy, żebyś czuł się komfortowo i miał poczucie bezpieczeństwa na każdym kroku."
    },
    {
        header: "Gdzie znajdę status mojej sprawy?",
        open: false,
        content: "Status sprawy sprawdzisz w aplikacji, w zakładce „Moje sprawy”. Tam znajdziesz aktualne informacje o etapie, na którym znajduje się Twoja sprawa. Dzięki temu zawsze wiesz, co się dzieje i jakie będą kolejne kroki."
    },
    {
        header: "Jak mogę skontaktować się z supportem?",
        open: false,
        content: 'Możesz skontaktować się z nami poprzez czat w aplikacji, e-mail <a href="mailto:kontakt@offkredyt.pl">kontakt@offkredyt.pl</a>. Czat jest obsługiwany bezpośrednio przez naszych konsultantów, którzy na bieżąco odpowiadają na pytania. Zawsze staramy się udzielać szybkiego i jasnego wsparcia.'
    }
];
