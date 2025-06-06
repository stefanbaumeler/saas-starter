type Props = {
    text: string
}

export const AuthTitle = ({
    text
}: Props) => {
    return <h1 className="text-3xl font-bold text-center">
        {text}
    </h1>
}
