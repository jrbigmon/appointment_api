export class IsValidRg {
  public static execute(rg: string): boolean {
    if (!rg) return false;

    rg = rg.replace(/[^\dxX]/g, '');

    if (rg.length < 7 || rg.length > 9) return false;

    if (/^(\d)\1+$/.test(rg)) return false;

    return /^\d{6,8}[\dxX]$/.test(rg);
  }
}
