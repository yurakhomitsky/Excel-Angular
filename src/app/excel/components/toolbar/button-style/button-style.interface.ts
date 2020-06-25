
export interface AppliedStyle {
    [key: string]: string;
}

export interface ButtonStyle {
    icon: string;
    active: boolean;
    value: { [key: string]: string | boolean; };
}
export interface DefaultStyles {
    textAlign: string;
    fontWeight: string;
    textDecoration: string;
    fontStyle: string;
}

