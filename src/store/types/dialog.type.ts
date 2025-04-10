export enum DialogType {
  NORMAL = 'NORMAL',
  ERROR = 'ERROR',
  ALERT = 'ALERT',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
}

interface DialogState {
  isVisible: boolean;
  content: string | null;
  type: DialogType;
  title: string | null;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  isCustomizeButton: boolean;
}

const initialDialogState: DialogState = {
  isVisible: false,
  content: null,
  title: null,
  confirmButtonText: 'OK',
  type: DialogType.NORMAL,
  cancelButtonText: 'Close',
  onConfirm: undefined,
  onCancel: undefined,
  isCustomizeButton: false,
};

export { initialDialogState };
export type { DialogState };
