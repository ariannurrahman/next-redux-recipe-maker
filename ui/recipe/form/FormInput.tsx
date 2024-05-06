interface InputProps {
  id: string;
  name: string;
  placeholder: string;
  label?: string;
  type: string;
  inputClass?: string;
  value?: string;
  onBlur?: () => void;
  required: boolean;
  onHandleEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const FormInput = ({
  id,
  inputClass,
  name,
  placeholder,
  type,
  value,
  onBlur,
  required,
  onHandleEnter,
}: InputProps) => {
  return (
    <div className='flex flex-col'>
      <input
        className={`${inputClass} bg-white flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`}
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onBlur={onBlur}
        required={required}
        onKeyDown={onHandleEnter}
      />
    </div>
  );
};
