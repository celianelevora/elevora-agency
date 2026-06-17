'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { PHONE_COUNTRIES } from './PhoneCountryCodes';

interface PhoneInputProps {
  name?: string;
  required?: boolean;
  defaultCode?: string;
  placeholder?: string;
  label?: string;
  hint?: string;
}

export default function PhoneInput({
  name = 'phone',
  required = false,
  defaultCode = '33',
  placeholder = 'Numéro de téléphone',
  label,
  hint,
}: PhoneInputProps) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState(defaultCode);
  const [search, setSearch] = useState('');
  const [phone, setPhone] = useState('');
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const country = useMemo(
    () => PHONE_COUNTRIES.find((c) => c.code === code) || PHONE_COUNTRIES[0],
    [code]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return PHONE_COUNTRIES;
    return PHONE_COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.includes(q.replace('+', ''))
    );
  }, [search]);

  return (
    <div className="form-field">
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}
          {!required && <span className="form-optional"> (optionnel)</span>}
        </label>
      )}
      <div ref={wrapRef} className={`phone-input ${open ? 'is-open' : ''}`}>
        <button
          type="button"
          className="phone-code-btn"
          onClick={() => setOpen(!open)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Indicatif téléphonique : ${country.name} (+${country.code})`}
        >
          <span className="phone-code-flag">{country.flag}</span>
          <span className="phone-code-num">+{country.code}</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={open ? 'phone-chev open' : 'phone-chev'}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <input
          type="tel"
          id={name}
          name={name}
          autoComplete="tel-national"
          className="phone-num-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required={required}
          placeholder={placeholder}
          // Le nom du champ envoie uniquement le numéro saisi ;
          // l'indicatif est joint via le hidden ci-dessous.
        />
        <input type="hidden" name={`${name}_country_code`} value={code} />
        <input type="hidden" name={`${name}_full`} value={`+${code} ${phone}`} />

        {open && (
          <div className="phone-dropdown" role="listbox">
            <div className="phone-dropdown-search">
              <input
                type="text"
                placeholder="Rechercher un pays…"
                aria-label="Rechercher un pays"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
            </div>
            <div className="phone-dropdown-list">
              {filtered.length === 0 ? (
                <div className="phone-dropdown-empty">Aucun pays trouvé</div>
              ) : (
                filtered.map((c, i) => (
                  <button
                    key={`${c.code}-${c.name}-${i}`}
                    type="button"
                    role="option"
                    aria-selected={c.code === code}
                    className={`phone-dropdown-item ${c.code === code ? 'is-active' : ''}`}
                    onClick={() => {
                      setCode(c.code);
                      setOpen(false);
                      setSearch('');
                    }}
                  >
                    <span className="phone-dropdown-flag">{c.flag}</span>
                    <span className="phone-dropdown-name">{c.name}</span>
                    <span className="phone-dropdown-code">+{c.code}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {hint && <div className="form-hint">{hint}</div>}
    </div>
  );
}
