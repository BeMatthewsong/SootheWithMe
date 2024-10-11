import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { MdSunny } from 'react-icons/md';
import { FaMoon } from 'react-icons/fa6';

const ToggleTheme = () => {
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme === undefined) {
      setTheme('system');
    }
  }, [resolvedTheme, setTheme]);

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className='relative h-32 w-60 rounded-full bg-var-orange-700 shadow-inner'
    >
      <div
        className={`absolute left-2 top-1/2 flex size-24 -translate-y-1/2 items-center justify-center rounded-full bg-white text-var-orange-600 transition-all duration-300 dark:translate-x-[26px] dark:bg-neutral-900 dark:text-var-orange-400`}
      >
        {resolvedTheme === 'dark' ? (
          <FaMoon size={18} />
        ) : (
          <MdSunny size={20} />
        )}
      </div>
    </button>
  );
};

export default ToggleTheme;
