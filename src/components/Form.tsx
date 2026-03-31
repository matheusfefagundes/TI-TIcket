import { ReactNode } from "react";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "./ui/field";

type FormProps = React.ComponentProps<"form"> & {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function Form({
  title,
  children,
  description,
  className,
  ...rest
}: FormProps) {
  return (
    <form {...rest}>
      <FieldSet>
        {title && (
          <FieldLegend className="text-app-gray-200 text-[20px] font-bold">
            {title}
          </FieldLegend>
        )}
        {description && (
          <FieldDescription className="text-app-gray-300 text-xs">
            {description}
          </FieldDescription>
        )}
        <FieldGroup className={className}>{children}</FieldGroup>
      </FieldSet>
    </form>
  );
}
