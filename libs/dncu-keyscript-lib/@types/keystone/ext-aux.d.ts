declare namespace Ext {

    export class Msg extends Ext.MessageBox { }

    export type ViewportConfig = {
        layout?: string | object
        autoScroll?: boolean
        items: Array<Ext.IComponent | Ext.IBoxComponent | Ext.IContainer | Ext.Container>
        listeners?: {
            render?: () => Promise<void> | void
            beforedestroy?: (component: Ext.Component) => Promise<boolean> | boolean
            beforeremove?: (container: Ext.Container, component: Ext.Component) => Promise<boolean> | boolean
            afterrender?: () => Promise<void> | void
        }
        defaults?: { split: boolean }
    }

    export class Viewport {
        constructor(config: ViewportConfig)
    }

    export interface IComponent {
        //region?: 'west' | 'center' | 'east' | 'north' | 'south'
        collapsible?: boolean
        collapsed?: boolean
        title?: string
        split?: boolean
        maxHeight?: number
        maxWidth?: number
        minHeight?: number
        minWidth?: number
    }

    interface Panel {
      initDraggable(): void;
    }

    interface ITip extends IPanel {
      /**
       * Minimum width of the tip in pixels
       */
      minWidth?: number;
      
      /**
       * Maximum width of the tip in pixels
       */
      maxWidth?: number;
      
      /**
       * The type of shadow to use for this tip
       */
      shadow?: string | boolean;
      
      /**
       * The default position to align to the target element
       */
      defaultAlign?: string;
      
      /**
       * True to automatically render the tip when created
       */
      autoRender?: boolean;
      
      /**
       * Amount of time in milliseconds to wait between showing consecutive tips
       */
      quickShowInterval?: number;
      
      /**
       * True to apply frame CSS to the tip
       */
      frame?: boolean;
      
      /**
       * True to initially render the tip hidden
       */
      hidden?: boolean;
      
      /**
       * The base CSS class applied to the tip
       */
      baseCls?: string;
      
      /**
       * Configuration for floating component
       */
      floating?: {
          shadow?: boolean;
          shim?: boolean;
          useDisplay?: boolean;
          constrain?: boolean;
      };
      
      /**
       * True to allow the tip to automatically adjust its height
       */
      autoHeight?: boolean;
      
      /**
       * The action to take when the close button is clicked (defaults to 'hide')
       */
      closeAction?: string;
      
      /**
       * True to display a close button on the tip header
       */
      closable?: boolean;
      
      /**
       * True to constrain the tip to the viewport
       */
      constrainPosition?: boolean;
      
      /**
       * True to make the tip draggable
       */
      draggable?: boolean | undefined;
      
      /**
       * True to automatically set the width based on content
       */
      measureWidth?: boolean;
    }

    /**
     * This is the base class for Ext.ToolTip that provides the basic layout and positioning that all tip-based classes require.
     * @extends Ext.Panel
     */
    class Tip extends Panel {
      /**
       * Creates a new Tip
       * @param {Ext.ITip} config The configuration options
       */
      constructor(config?: ITip);
      
      /** Minimum width of the tip in pixels */
      minWidth: number;
      
      /** Maximum width of the tip in pixels */
      maxWidth: number;
      
      /** The type of shadow to use for this tip */
      shadow: string;
      
      /** The default position to align to the target element */
      defaultAlign: string;
      
      /** True to automatically render the tip when created */
      autoRender: boolean;
      
      /** Amount of time in milliseconds to wait between showing consecutive tips */
      quickShowInterval: number;
      
      /** True to apply frame CSS to the tip */
      frame: boolean;
      
      /** True to initially render the tip hidden */
      hidden: boolean;
      
      /** The base CSS class applied to the tip */
      baseCls: string;
      
      /** Configuration for floating component */
      floating: {
          shadow: boolean;
          shim: boolean;
          useDisplay: boolean;
          constrain: boolean;
      };
      
      /** True to allow the tip to automatically adjust its height */
      autoHeight: boolean;
      
      /** The action to take when the close button is clicked */
      closeAction: string;
      
      /** Flag to track if the tip has been repainted (IE7 specific) */
      repainted: boolean;
      
      /** Drag and drop handler for the tip */
      dd?: dd.DragSource;
      
      /** Initialize component */
      initComponent(): void;
      
      /** After render handler */
      afterRender(): void;
      
      /**
       * Show the tip at the specified position
       * @param {Array} xy The x/y coordinates where to show the tip
       */
      showAt(xy: [number, number]): void;
      
      /**
       * Automatically set the width of the tip based on content
       * @param {number} [adjust] Optional amount to add to the calculated width
       */
      doAutoWidth(adjust?: number): void;
      
      /**
       * Show this tip aligned to the target element
       * @param {Ext.Element|HTMLElement|string} el The element to align to
       * @param {string} [position] The position to align to (defaults to defaultAlign)
       */
      showBy(el: Element | HTMLElement | string, position?: string): void;
      
      /** Initialize draggable functionality */
      initDraggable(): void;
    }

    namespace Tip {
      /**
       * Internal class that allows tips to be draggable
       * @extends Ext.Panel.DD
       */
      class DD extends dd.DragSource {
        /**
         * Creates a new drag and drop handler for a Tip
         * @param {Ext.Tip} tip The tip to make draggable
         * @param {Object} [config] Additional configuration options
         */
        constructor(tip: Tip, config?: object);
        
        /**
         * Reference to the tip this DD is associated with
         */
        tip: Tip;
        
        /**
         * Whether to scroll while dragging
         */
        scroll: boolean;
      }
    }

    /**
     * Configuration options for Ext.ToolTip
     */
    interface IToolTip extends ITip {
      /**
       * Delay in milliseconds before the tooltip displays after the mouse enters the target element
       */
      showDelay?: number;
      
      /**
       * Delay in milliseconds before the tooltip hides when the mouse leaves the target element
       */
      hideDelay?: number;
      
      /**
       * Delay in milliseconds before the tooltip automatically hides
       */
      dismissDelay?: number;
      
      /**
       * True to have the tooltip follow the mouse as it moves over the target element
       */
      trackMouse?: boolean;
      
      /**
       * True to anchor the tooltip to the target element
       */
      anchorToTarget?: boolean;
      
      /**
       * A numeric pixel value used to offset the anchor position
       */
      anchorOffset?: number;
      
      /**
       * The target element to show the tooltip when hovered
       */
      target?: string | HTMLElement | Ext.Element;
      
      /**
       * A CSS selector which allows selection of descendant elements of the target to trigger showing the tooltip
       */
      delegate?: string;
      
      /**
       * The anchor position of the tooltip (defaults to 'bottom')
       * Possible values: 'top', 'left', 'right', 'bottom'
       */
      anchor?: string;
      
      /**
       * True to constrain the tooltip position within the viewport
       */
      constrainPosition?: boolean;
      
      /**
       * The initial alignment position
       */
      defaultAlign?: string;
    }

    /**
     * A specialized tooltip class for tooltips that can be anchored to elements
     * @extends Ext.Tip
     */
    class ToolTip extends Tip {
      /**
       * Creates a new ToolTip
       * @param {Ext.IToolTip} config The configuration options
       */
      constructor(config?: IToolTip);
      
      /** Delay in milliseconds before showing the tooltip */
      showDelay: number;
      
      /** Delay in milliseconds before hiding the tooltip */
      hideDelay: number;
      
      /** Delay in milliseconds before the tooltip automatically hides */
      dismissDelay: number;
      
      /** True to have the tooltip follow the mouse */
      trackMouse: boolean;
      
      /** True to anchor the tooltip to the target element */
      anchorToTarget: boolean;
      
      /** A numeric pixel value used to offset the anchor */
      anchorOffset: number;
      
      /** Counter for target showing */
      targetCounter: number;
      
      /** True to constrain the tooltip to the viewport */
      constrainPosition: boolean;
      
      /** The target element */
      target: Ext.Element;
      
      /** The anchor element */
      anchorEl: Ext.Element;
      
      /** The element that triggered the tooltip */
      triggerElement: HTMLElement;
      
      /** The original anchor setting */
      origAnchor: string;
      
      /** The tip's anchor position */
      tipAnchor: string;
      
      /** The last active time */
      lastActive: Date;
      
      /** Initialize component */
      initComponent(): void;
      
      /** Render the tooltip */
      onRender(ct: Element, position?: string | number | undefined): void;
      
      /** Setup after rendering */
      afterRender(): void;
      
      /** Initialize the target element */
      initTarget(target: string | HTMLElement | Ext.Element): void;
      
      /** Handle mouse movement */
      onMouseMove(e: Ext.EventObject): void;
      
      /** Get target XY coordinates */
      getTargetXY(): [number, number];
      
      /** Get mouse offset */
      getMouseOffset(): [number, number];
      
      /** Get anchor position */
      getAnchorPosition(): string;
      
      /** Get anchor alignment */
      getAnchorAlign(): string;
      
      /** Get tooltip offsets */
      getOffsets(): [number, number];
      
      /** Handle mouseover on target */
      onTargetOver(e: Ext.EventObject): void;
      
      /** Delay showing the tooltip */
      delayShow(): void;
      
      /** Handle mouseout on target */
      onTargetOut(e: Ext.EventObject): void;
      
      /** Delay hiding the tooltip */
      delayHide(): void;
      
      /** Hide the tooltip */
      hide(): this;
      
      /** Show the tooltip */
      show(): this;
      
      /** Show at specific coordinates */
      showAt(xy: [number, number]): void;
      
      /** Synchronize the anchor position */
      syncAnchor(): void;
      
      /** Set the tooltip's page position */
      setPagePosition(x: number, y: number): void;
      
      /** Clear a specific timer */
      clearTimer(timer: string): void;
      
      /** Clear all timers */
      clearTimers(): void;
      
      /** On show handler */
      onShow(): void;
      
      /** On hide handler */
      onHide(): void;
      
      /** Document mousedown handler */
      onDocMouseDown(e: Ext.EventObject): void;
      
      /** Enable the tooltip after it was disabled */
      doEnable(): void;
      
      /** On disable handler */
      onDisable(): void;
      
      /** Adjust position before showing */
      adjustPosition(x: number, y: number): {x: number, y: number};
      
      /** Before destroy handler */
      beforeDestroy(): void;
      
      /** On destroy handler */
      onDestroy(): void;
    }

    export class ProgressBar extends BoxComponent {
        updateProgress(percentage: number, message?: string, animate?: boolean): void
        constructor(cfg?: { value?: number, text?: string, hidden?: boolean, fieldLabel?: string, animate?: boolean })
    }

    namespace tree {
        export interface ITreePanel extends IPanel {
            lines?: boolean
            contextMenu?: Ext.menu.Menu
            uiProvider?: () => Ext.tree.TreeNodeUI
        }

        export class AsyncTreeNode extends Ext.tree.TreeNode {
        }

        type TreeEditorListeners = {
            complete: (_editor: Ext.tree.TreeEditor, _value: string | number, _oldValue: string | number) => void
        }
        export class TreeEditor {
            editNode?: Ext.tree.TreeNode
            constructor(tree: Ext.tree.TreePanel)
            addListener<T extends keyof TreeEditorListeners>(event: T, fn: TreeEditorListeners[T]): void
        }
    }

    namespace data {
        interface Store extends Ext.util.Observable {
            rejectChanges(): void
            multiSortInfo: { direction: 'ASC' | 'DESC', sorters: SortInfo[] }
        }
        class GroupingStore extends Ext.data.Store {
            constructor(cfg: Ext.data.IStore & {
                groupField: string
                groupOnSort?: boolean
                groupDir?: 'ASC' | 'DESC'
            })
            groupDir: 'ASC' | 'DESC'
            groupField: string
        }
    }
    namespace list {
        class ListView extends Ext.DataView {
            constructor(cfg?: IDataView)
        }
    }
    namespace grid {
        type ColumnConfig = {
            id?: string
            header: string
            width?: string | number
            dataIndex: string
            xtype?: 'datecolumn' | 'numbercolumn' | 'booleancolumn' | 'gridcolumn' | 'templatecolumn'
            format?: string
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            renderer?: (value: unknown, meta: { style: string, css: string, attr: string }, record: Ext.data.Record, rowIndex: number, colIndex: number, store: Ext.data.Store) => any
            editor?: Ext.form.Field
            sortable?: boolean
            align?: 'right' | 'left' | 'center'
            locked?: boolean // Only valid when using LockingGridView with LockingColumnModel.
            filter?: Ext.ux.grid.ColumnFilter
            hideable?: boolean
            hidden?: boolean
            css?: string
            menuDisabled?: boolean
            groupable?: boolean
            fixed?: boolean
        }

        export interface IGridPanel extends IPanel {
            sm?: RowSelectionModel,
            contextMenu?: Ext.menu.Menu
            clicksToEdit?: number
            columnLines?: boolean,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            plugins?: any[]
        }

        export interface GridPanel extends Ext.Panel {
            reconfigure(store: Ext.data.Store, colModel: Ext.grid.ColumnModel): void
        }

        export interface IGridView extends util.IObservable {
            getRowClass?: (r: data.Record, index: number) => string | undefined
        }

        export interface GridView extends util.IObservable {
            getRow(rowIndex: number): void
            focusRow(rowIndex: number): void
        }

        export interface ColumnModel extends Ext.util.Observable {
            setConfig(config: ColumnConfig[], initial: boolean): void
            getDataIndex(col: number): string
            findColumnIndex(col: string): number
            setHidden(colIndex: number, hidden: boolean): void
            getColumnsBy(fn: (col: Column) => boolean, scope?: object): Column[]
            moveColumn(oldIndex: number, newIndex: number): void
            getColumnAt(index: number): Column
            setColumnWidth(index: number, width: number, supressEvent?: boolean): void
            getColumnCount(visibleOnly: boolean): number
        }
        export class GroupingView extends GridView {
            constructor(cfg: IGridView & { groupTextTpl?: string, startCollapsed?: boolean })
        }
    }

    namespace form {
        export interface ITextField extends IField {
            inputType?: 'radio' | 'text' | 'file' | 'password'
            maxLength?: number
            // listeners?: { 
            //     specialkey?: (_field: Field, _e: Ext.EventObject) => void
            // }
        }
        export class DisplayField extends Ext.form.Field {
            constructor(cfg: Ext.form.IField & {
                //xtype: "displayfield"
                fieldLabel: string
                labelStyle?: string
                html?: string
                contentEl?: string
            })
        }
        export interface Checkbox extends Ext.form.Field<boolean> {
            getName(): string
        }

        export class NumberField extends Ext.form.TextField {
            constructor(cfg: {
                allowBlank?: boolean
                allowNegative?: boolean
                maxValue?: number
            })

            //getName(): string
        }
    }

    namespace menu {
        export interface Menu {
            contextNode?: Ext.tree.TreeNode
            contextRowIndex?: number
            contextColIndex?: number
        }


        export interface Item extends BaseItem {
            setText(text: string): void;
        }
    }

    namespace util {
        class CSS {
            // Creates a stylesheet from a text blob of rules. These rules will be wrapped in a STYLE tag and appended to the HEAD of the document.
            static createStyleSheet(cssText: string, id: string): StyleSheet
            // Gets an an individual CSS rule by selector(s)
            static getRule(selector: string | string[], refreshCache: boolean): CSSRule
            // Gets all css rules for the document
            static getRules(refreshCache: boolean): unknown
            // Refresh the rule cache if you have dynamically added stylesheets
            static refreshCache(): void
            // Removes a style or link tag by id
            static removeStyleSheet(id: string): void
            // Dynamically swaps an existing stylesheet reference for a new one
            swapStyleSheet(id: string, url: string): void
            // Updates a rule property
            updateRule(selector: string | string[], property: string, value: string): boolean
        }

        class DelayedTask {
            delay(ms: number, fn: (args?: unknown[]) => void, scope?: object, args?: unknown[]): void
        }
    }

    namespace ux {
        namespace grid {

            type ColumnFilter = {
                type: 'numeric' | 'string' | 'boolean' | 'date' | 'auto',
                disabled?: boolean,
            } | {
                type: 'list'
                disabled?: boolean,
                options: string[] | Array<[string | null, string]>,
                phpMode?: boolean
            }

            type GridColumnFilter = ColumnFilter & { dataIndex: string }

            export class RowExpander extends Ext.util.Observable {
                constructor(cfg: {
                    tpl?: Ext.Template
                });
            }
            export class GridFilters {

                constructor(cfg: {
                    encode?: boolean // json encode the filter query
                    local?: boolean
                    filters: GridColumnFilter[] | Ext.grid.ColumnModel
                });

            }
            type ColumnHeaderGroupRow = { header: string, colspan: number, align: string }[];
            export class ColumnHeaderGroup extends Ext.util.Observable {
                constructor(cfg: { rows: ColumnHeaderGroupRow[] });
                config: { rows: ColumnHeaderGroupRow[] }
            }
            // export class LockingColumnModel extends Ext.grid.ColumnModel {
            // }
            // export class LockingGridView extends Ext.grid.GridView {
            // }
        }

        namespace tree {
            export type ITreeGrid = Ext.tree.ITreePanel & { columns?: Ext.grid.ColumnConfig[], dataUrl?: string }
            export class TreeGrid extends Ext.tree.TreePanel {
                constructor(cfg: ITreeGrid);
            }

            export class TreeGridNodeUI extends Ext.tree.TreeNodeUI {
            }
        }
    }

    // export class MessageBox {
    //   static readonly CANCEL: object
    //   static readonly ERROR: string
    //   static readonly INFO: string
    //   static readonly OK: object
    //   static readonly OKCANCEL: object
    //   static readonly QUESTION: string
    //   static readonly WARNING: string
    //   static readonly YESNO: object
    //   static readonly YESNOCANCEL: object
    //   static buttonText: object
    //   static defaultTextHeight: number
    //   static maxWidth: number
    //   static minProgressWidth: number
    //   static minPromptWidth: number
    //   static minWidth: number

    //   static alert(title: string, msg: string, fn?: Function, scope?: object): MessageBox
    //   static confirm(title: string, msg: string, fn?: Function, scope?: object): MessageBox
    //   static getDialog(titleText: object): Window
    //   static hide(): MessageBox
    //   static isVisible(): boolean
    //   static progress(title: string, msg: string, progressText?: string): MessageBox
    //   static prompt(title: string, msg: string, fn?: Function, scope?: object, multiline?: boolean | number, value?: string): MessageBox
    //   static setIcon(icon: string): MessageBox
    //   static show(config: IMessageBox): MessageBox
    //   static updateProgress(value?: number, progressText?: string, msg?: string): MessageBox
    //   static updateText(text?: string): MessageBox
    //   static wait(msg: string, title?: string, config?: any): MessageBox
    // }
}

declare namespace Ext.dd {
  interface DragSource {
    proxy?: PanelProxy;
    scroll?: boolean;
    hide?(): void;
    show?(): void;
  }

  /**
   * Configuration options for PanelProxy
   */
  export interface IPanelProxy {
    /**
     * True to insert a placeholder proxy element while dragging the panel
     */
    insertProxy?: boolean;
  }

  /**
   * A specialized drag proxy created for dragging a Panel
   */
  export class PanelProxy {
    /**
     * Creates a new Panel drag proxy
     * @param {Ext.Panel} panel The Panel to create a proxy for
     * @param {IPanelProxy} [config] Additional configuration options
     */
    constructor(panel: Ext.Panel, config?: IPanelProxy);
    
    /**
     * The Panel this proxy is associated with
     */
    panel: Ext.Panel;
    
    /**
     * Unique ID for the proxy element
     */
    id: string;
    
    /**
     * The ghost element
     */
    ghost?: Ext.Element;
    
    /**
     * The placeholder element
     */
    proxy?: Ext.Element;
    
    /**
     * True to insert a placeholder proxy element while dragging the panel
     */
    insertProxy: boolean;
    
    /**
     * Compatibility with StatusProxy - empty function
     */
    setStatus: Function;
    
    /**
     * Compatibility with StatusProxy - empty function
     */
    reset: Function;
    
    /**
     * Compatibility with StatusProxy - empty function
     */
    update: Function;
    
    /**
     * Compatibility with StatusProxy - empty function
     */
    stop: Function;
    
    /**
     * Compatibility with StatusProxy - empty function
     */
    sync: Function;
    
    /**
     * Returns the ghost element for this proxy
     * @returns {Ext.Element} The ghost element
     */
    getEl(): Ext.Element;
    
    /**
     * Returns the ghost element for this proxy
     * @returns {Ext.Element} The ghost element
     */
    getGhost(): Ext.Element;
    
    /**
     * Returns the proxy element
     * @returns {Ext.Element} The proxy element
     */
    getProxy(): Ext.Element;
    
    /**
     * Hides the ghost and removes the proxy
     */
    hide(): void;
    
    /**
     * Shows the ghost and creates the proxy if needed
     */
    show(): void;
    
    /**
     * Repairs the proxy after a drag operation
     * @param {Array} xy The XY coordinates
     * @param {Function} callback The callback function
     * @param {Object} scope The scope for the callback
     */
    repair(xy: [number, number], callback?: Function, scope?: any): void;
    
    /**
     * Moves the proxy to a different location in the DOM
     * @param {Ext.Element} parentNode The new parent element
     * @param {HTMLElement} [before] The element to insert before
     */
    moveProxy(parentNode: Ext.Element, before?: HTMLElement): void;
  }
}

declare namespace Ext.form {
  /**
   * Configuration options for Ext.form.FieldSet
   */
  interface IFieldSet extends Ext.IPanel {
    /**
     * True to render a checkbox into the fieldset frame just before the legend to expand/collapse the fieldset
     */
    checkboxToggle?: boolean | object;
    
    /**
     * The name attribute for the toggle checkbox if checkboxToggle = true
     */
    checkboxName?: string;
  }

  /**
   * A container for grouping sets of fields with a title and optional collapsible layout
   * @extends Ext.Panel
   */
  class FieldSet extends Ext.Panel {
    /**
     * Creates a new FieldSet
     * @param {Ext.form.IFieldSet} config The configuration options
     */
    constructor(config?: IFieldSet);
    
    /**
     * The base CSS class applied to the fieldset
     */
    baseCls: string;
    
    /**
     * The layout type for the fieldset
     */
    layout: string;
    
    /**
     * Whether to animate expanding/collapsing
     */
    animCollapse: boolean;
    
    /**
     * The checkbox element (if checkboxToggle is enabled)
     */
    checkbox?: Ext.Element;
    
    /**
     * Renders the fieldset
     * @param container The container to render to
     * @param position The position within the container
     */
    onRender(container: Ext.Element, position?: string | number): void;
    
    /**
     * Handles collapsing the fieldset
     * @param animate Whether to animate the collapse
     * @param args Additional arguments
     */
    onCollapse(animate: boolean, args: any): void;
    
    /**
     * Handles expanding the fieldset
     * @param animate Whether to animate the expand
     * @param args Additional arguments
     */
    onExpand(animate: boolean, args: any): void;
    
    /**
     * Handler for when the fieldset's checkbox is clicked
     */
    onCheckClick(): void;
  }
}