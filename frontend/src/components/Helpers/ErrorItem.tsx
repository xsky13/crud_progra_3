import { TriangleAlertIcon } from "lucide-react";
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "../ui/item";

export default function ErrorItem(props: {
    error: string;
    className?: string;
}) {
    return (
        <Item
            variant="muted"
            className={`mt-5 bg-red-100 text-red-900 ${props.className}`}
        >
            <ItemMedia variant="icon">
                <TriangleAlertIcon />
            </ItemMedia>
            <ItemContent>
                <ItemTitle>Error</ItemTitle>
                <ItemDescription className="text-red-800">
                    {props.error}
                </ItemDescription>
            </ItemContent>
        </Item>
    );
}
