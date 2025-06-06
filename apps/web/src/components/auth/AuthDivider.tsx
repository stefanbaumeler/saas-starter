type Props = {
    text?: string
}

export const AuthDivider = ({
    text
}: Props) => {
    return <div
        className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border w-full"
    >
        <span className="relative z-10 bg-background px-2 text-muted-foreground uppercase empty:hidden">
            {text ?? ''}
        </span>
    </div>
}
