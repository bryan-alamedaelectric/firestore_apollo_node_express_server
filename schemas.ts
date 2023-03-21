const graphql = String.raw;

const schema_json = {
  scalars: ["JSONObject"],
  enum: {
    OrderStatusEnum: graphql`
      {
        Completed
        Inprocess
        Worq
        ALL
      }
    `,
    OrderAssociationEnum: graphql`
      {
        ALL
        requestedByUser
        submittedByUser
      }
    `,
  },
  inputs: {
    IncomingKitProduct: graphql`
      {
        id: Int
        quantityInKit: Int
      }
    `,
    InputBranch: graphql`
      {
        id: String
        name: String
      }
    `,
    InputAddress: graphql`
      {
        city: String
        state: String
        street_line_one: String
        street_line_two: String
        street_line_three: String
        postal_code: String
        country: String
      }
    `,
    SearchCollection: graphql`
      {
        id: String
        page: Int
        itemsPerPage: Int
      }
    `,
    CollectionWhere: graphql`
      {
        field: String
        operator: String
        value: String
      }
    `,
    LineItem: graphql`
      {
        PartIdentifiers: PartIdentifier
        QtyOrdered: QtyOrdered
        LineItemCommentList: LineItemCommentList
      }
    `,
    PartIdentifier: graphql`
      {
        EclipsePartNumber: String
      }
    `,
    QtyOrdered: graphql`
      {
        Quantity: Int
      }
    `,
    UsersToJobsObj: graphql`
      {    
        users: [String]
        jobs: [String]
      }
    `,
    LineItemCommentList: graphql`{
              LineItemComment: [String]   
          }`,
    OrdersFilter: graphql`{
              job: String! = ""
              status: OrderStatusEnum
              searchText: String! = ""
              # Options: "ALL" (Orders the User was either a Requestor or Submitter), "requestedByUser" (User Requested order, Ex. Worq Order), "submittedByUser" (User submitted worq order, or placed regular order)
              orderAssociation: OrderAssociationEnum
          }`,
    Pagination: graphql`{
              sort: String!
              dir: String! = "asc"
              limit: Int! = 20
              page: Int! = 0
              docID: String
              navType: String
      }`,
    InputNewPermissions: graphql`
      {
        createAdmins: Boolean
        createUsers: Boolean
        canOrder: Boolean
        shopFullSite: Boolean
        onlyShopFavorites: Boolean
        worqOrders: Boolean
        viewAllOrders: Boolean
        viewJobAssignedOrders: Boolean
        viewOrdersByUser: Boolean
        showPricing: Boolean
        viewFinance: Boolean
        managePoints: Boolean
        viewPointsPage: Boolean
        viewPointsOnSite: Boolean
        manageRebates: Boolean
        viewRebates: Boolean
        manageJobs: Boolean
        editJobs: Boolean
        viewJobs: Boolean
        shopJobs: Boolean
        manageFavorites: Boolean
        editFavorites: Boolean
        viewFavorites: Boolean
        shopFavorites: Boolean
      }
    `,
    ezIncomingProduct: graphql`
      {
        manufacturer_part_number: String
        qty: Int
      }
    `,
  },
  interfaces: {
    SearchResult: graphql`
      {
        index: String
        page: Int
        pages: Int
        itemsPerPage: Int
        query: String
        hasResults: Boolean
        total: Int
        bestMatch: Float
      }
    `,
    Primary: graphql`
      {
        id: ID
        name: String
        collection: String
      }
    `,
    Entity: graphql`
      {
        address: Address
        id: ID
        branch: Branch
        name: String
      }
    `,
  },
  types: {
    OmittedUsers: graphql`
      {
        omitted_users_from_notification_email: JSONObject
      }
    `,
    AccessPreset: graphql`
      {
        id: String
        name: String
        permissions: NewPermissions
        description: String
      }
    `,
    Address: graphql`
      {
        city: String
        state: String
        street_line_one: String
        street_line_two: String
        street_line_three: String
        postal_code: String
        country: String
      }
    `,
    Attribute: graphql`{
              id: ID
              key: String
              type: String
              uom: String
              value: String
              values: [AttributeValue]
          }`,
    AttributeValue: graphql`
      {
        id: ID
        value: String
        count: Int
      }
    `,
    Branch: graphql`
      {
        aed: Boolean
        cst: Boolean
        address: Address
        id: ID
        branch_id: Int
        branch_name: String
        name: String
        lead_times: LeadTimeObject
        stock_branch: Branch
        coordinates: Location
        hours: JSONObject
        phone: String
        img: BranchImage
      }
    `,
    BranchImage: graphql`
      {
        src: String
        alt: String
      }
    `,
    Bundle: graphql`
    {
      id: ID
      name: String
      products(limit:Int): [Product]
    }
  `,
    "Customer implements Entity": graphql`
      {
        AED: Boolean
        CST: Boolean
        address: Address
        id: ID
        branch: Branch
        name: String
        doesMasterAdminExist: Boolean
        existsInFb: Boolean
      }
    `,
    ezSelector: graphql`
      {
        name: String
        parent: String
        description: [String]
        ez: [ezCategory]
        img: String
        list: [ezList]
      }
    `,
    ezSelectorGroup: graphql`
        {
          id: String
          name: String
          heading: [String]
          subheading: [String]
          description: [String]
        }
      `,
    ezCategory: graphql`
      {
        code: String
        name: String
      }
    `,
    ezList: graphql`
      {
        indents: Int
        content: String
      }
    `,
    "Job implements Entity": graphql`{
              AED: Boolean
              CST: Boolean
              address: Address
              customer_id: String
              customerPO: String
              id: ID
              branch:Branch
              deliveryInstructions:String
              name: String
              phone: String
              contact: String
              fulfillment: String
              shipping: String
              jobalyticsLastUpdated: String
              orders: [Order]
              # Users include people who shop a job during checkout and people who can shop and view Jobs / Jobalytics.
              users: [User]
              location: Location
              "The status can be active or archived"
              viewers: [User]
              editors: [User]
            "The status can be active or archived"
              status: String
              start_date: String
              endDate: String
              totalSpend: Float
              totalOrders: Int
            "JobCredit information will come from eclipse account_inquiry"
              credit: JobCredit
              isHouse: Boolean
              "When this job has an inquiry such as job limit increase or request to archive"
              underReview: Boolean
              "This is the job limit, house account will be null for limit"
              limit: Float
              # total balance due for open sales
              open_orders_balance: Float
              # total balance due for closed sales
              accounts_receivable_balance: Float
              available_limit: Float
              "canCloseJob is true when openOrdersBalance AND accountsReceivableBalance is 0"
              canCloseJob: Boolean
              finance: Financials
              alerts: [Alert]
              lastUpdate: String
              jobalytics:Jobalytics
          }`,
    Jobalytics: graphql`{
      totalOrders: Int
      firstOrderDate: String
      lastOrderDate: String
      #Percent of web orders
      webOrdersPercentage: String
      averageOrder: Float
      poSummary: [POSummary]
      jobItems:[JobItems]
      categoryBreakDown: [CategoryBreakDown]
      openProjectTotal: Float
    }
    `,
    CategoryBreakDown: graphql`
      {
        # id: ID
        name: String
        value: Float
      }
    `,
    POSummary: graphql`
      {
        customer_po: String
        # invoiced total
        total: Float
        type: String
        # amount open for project
        open_amount: Float
      }
    `,
    JobItems: graphql`
      {
        # id: ID
        description: String
        eclipse_id: String
        img: String
        manufacturer: String
        order_data_in_millis: Float
        order_id: String
        order_month: Int
        order_source: String
        order_year: Int
        part_number: String
        quantity: Int
        spend: Float
        categories: [String]
        order_date: String
      }
    `,
    JobCredit: graphql`
      # Information regarding the job limit.
      {
        available: Float
        limit: Float
        currency: String
        order_entry_ok: Boolean
        terms: String
        percentUsed: Float
        description: String
        open_balance: Float
        future_balance: Float
      }
    `,
    Alert: graphql`
      {
        # credit_limit or job_limit
        type: String
        description: String
        name: String
        message: String
        status: String
      }
    `,
    "Account implements Entity": graphql`{
              AED: Boolean
              CST: Boolean
              address: Address,
              id: ID
              sales_email: String
              branch: Branch
              name: String
              finance: Financials
              users: [User]
              orders(pagination: Pagination): OrdersResult
              favorites: FavoritesResult
              jobs: [Job]
              pointsDashboard: PointsDashboard
              alerts:[Alert]
              customerKits: [Kit]
              savedCarts: [Cart]
          }`,
    ActionUsersToJobsResult: graphql`{
            users: [User]
            jobs: [Job]
          }`,
    ActionUsersToFavoritesResult: graphql`{
            users: [User]
            favorites: [Favorite]
          }`,
    Banner: graphql`
      {
        id: String
        name: String
        link: String
        route: String
        img: String
        index: Int
        type: String
      }
    `,
    Financials: graphql`
      {
        future: Float
        current: Float
        thirty: Float
        sixty: Float
        ninety: Float
        one_twenty: Float
        # Open Balance
        ar_total: Float
        # Future Balance
        ar_orders: Float
        ar_terms: String
        ar_credit_limit: Int
        ar_credit_avail: Float
        mtd_sales: Float
        ytd_sales: Float
        six_month_average: Float
        six_month_high: Float
        payment_days: Int
        last_sale: Transaction
        last_payment: Transaction
        currency: String
        # openInvoices correlates to account_inquiry_item_list from the eclipse account Inquiry call
        openInvoices: OpenInvoiceResult
      }
    `,
    OpenInvoiceResult: graphql`
      {
        invoices: [Invoice]
        agingBuckets: [AgingBucket]
        totalCount: Int
      }
    `,
    AgingBucket: graphql`
      {
        id: ID
        name: String
        age: String
        total: Float
      }
    `,
    Invoice: graphql`
      {
        # The internal Eclipse reference of this transaction. This string is an ID followed by a period (.) followed by an invoice number, right justified to 3 digits with leading zeroes. The ID may be an order ID if this item is an order, or it may be another type of ID, such as an order (S1234567.002) or a cash receipt (C1234567.001)
        id: ID
        # Order id the invoice is tied to
        order_id: String
        # Generation id the invoice is tied to
        invoice_number: String
        # The branch the invoice shipped from
        branch: Branch
        transaction: Transaction
        # Holds the amount applied to the original transaction and the date the payment was made
        payment: Transaction
        # The remaining balance for the transaction
        balance: Float
        # The aging category of the transaction ex. Current, 31-60, 61-90, 91-120, Over120
        age: String
        #
        customer_po: String
        shipping_information: ShippingInformation
        # the type of invoices can be Checks or Invoice
        type: String
      }
    `,
    Transaction: graphql`
      {
        amount: Float
        date: String
      }
    `,
    LeadTimeObject: graphql`{
             aed: [LeadTime]
             cst: [LeadTime] 
          }`,
    LeadTime: graphql`
      {
        id: ID
        branch: Branch
        days: Int
        stock: Int
      }
    `,
    Location: graphql`
      {
        lat: Float
        lng: Float
      }
    `,
    Cart: graphql`{
              id: ID
              name: String
              user: String
              app: String
              created_date: String
              last_active_date: String
              converted_date: String
              converted: Boolean
              products: [Product]
              willCallDateGroupedProducts: [FullfillmentDateGroupedProducts]
              deliveryDateGroupedProducts: [FullfillmentDateGroupedProducts]
              willCallBundleDate: String
              deliveryBundleDate: String
              lines: Int
              sum: Int
              mfrs: Int
              total: Float
              total_points: Int
              points_available: Int
              promotions: [Promotion]
              bundle_date: String
              hasBackOrder: Boolean
          }`,
    Favorite: graphql`{
              id: ID
              customer: Customer
              app: String
              app_name: String
              name: String
              created_date: String
              last_active_date: String
              products(limit:Int): [Product]
              users: [String]     
              viewers: [User]
              editors: [User]     
          }`,
    NewPermissions: graphql`
      {
        createAdmins: Boolean
        createUsers: Boolean
        canOrder: Boolean
        shopFullSite: Boolean
        onlyShopFavorites: Boolean
        worqOrders: Boolean
        viewAllOrders: Boolean
        viewJobAssignedOrders: Boolean
        viewOrdersByUser: Boolean
        showPricing: Boolean
        viewFinance: Boolean
        managePoints: Boolean
        viewPointsPage: Boolean
        viewPointsOnSite: Boolean
        manageRebates: Boolean
        viewRebates: Boolean
        manageJobs: Boolean
        editJobs: Boolean
        viewJobs: Boolean
        shopJobs: Boolean
        manageFavorites: Boolean
        editFavorites: Boolean
        viewFavorites: Boolean
        shopFavorites: Boolean
      }
    `,
    Inventory: graphql`
      {
        id:ID
        branch: Branch
        default: StockLevel
        levels: [StockLevel]
        # an array of length 2, where index 0 has current branch quantity and index 1 has quantity for the whole region
        locationGroupCount: [StockLevel]
        basic_text: String
        # number of inventory available through the home branch and its region
        basic_count: Int
        backOrder: Boolean
        in_stock: Boolean
        full: [LeadTime]
        timestamp: String
        max_quantity: Int
      }
    `,
    InquiryType: graphql`
      {
        name: String
        id: String
        weight: Int
      }
    `,
    StockLevel: graphql`
      {
        # the number of days that will take
        level: Int
        # the number inventory that you can get within the day
        stock: Int
        message: String
        willcall: String
        delivery: String
      }
    `,
    OrderSubmitResult: graphql`
    {
      order: Order
      productsOverMaxQuantity: [Product]
    }
    `,
    Order: graphql`
      {
        customer: String
        id: ID
        customer_release_number: String
        status: String
        order_header: OrderHeader
        line_item_list: LineItemList
        order_totals: OrderTotals
        order_generations: OrderGenerations
        ordered_by: String
        ordered_by_email: String
        ordered_by_user: String
        order_date: String
        payment_terms: PaymentTerms
        outside_sales_person: String
        written_by: String
        worq: Boolean
        customer_po: String
        shipping_status: String
        shipping_percent: Float
        shipping_branch: Branch
        jobs: [String]
        job: String
        pricing_branch: Branch
        ship_date: String
        attachments: AttachmentsByType
        isProject: Boolean
        # Gear, Lighting, Regular, Worq
        type: String
        # only present for Gear(Project Management Software) type orders
        open_amount: Float
        # shipping_information first gen shipping information
        shipping_information: ShippingInformation
        # billing_information is just the bill_to
        billing_information: BillingInformation
        # The inputs used by Users who can only place Worq Orders
        worqOrderSubmitInputs: JSONObject
        cart: Cart
      }
    `,
    OrderHeader: graphql`
      {
        order_id: ID
        generation_id: Int
        order_status: String
        print_status: String
        order_type: String
        customer_po: String
        pricing_branch: Branch
        shipping_branch: Branch
        order_date: String
        ship_date: String
        last_update: String
        bill_to: Customer
        ship_to: Entity
        shipping_information: ShippingInformation
        email_address: String
        progress_billing: String
        order_source: String
        sales_source: String
        attachments: [Attachment]
        telephone: String
      }`,
    PaymentTerms: graphql`
      {
        code: String
        description: String
      }
    `,
    ReorderResult: graphql`{
          id: String
          categories: [String]
          products: [Product],
          total: Int
          updateTime: String
      }`,
    UpdateReorderResult: graphql`
      {
        updateTime: String
      }
    `,
    UpdateOrdersResult: graphql`
      {
        updated_time: String
      }
    `,
    LineItemList: graphql`
    {
      order_id: ID
      line_item: [Product]
      line_item_count: Int
    }`,
    OrderTotals: graphql`
      {
        subtotal: Float
        tax: Float
        federal_excise_tax: Float
        freight: Float
        handling: Float
        payment: JSONObject
        total: Float
      }
    `,

    OrderGenerations: graphql`{
               order_generation: [OrderGeneration] 
          }`,
    OrderGeneration: graphql`
      {
        order_generation_id: ID
        # generation_id will have leading zeros, the length of the string will be 3
        generation_id: String
        order_header: OrderHeader
        line_item_list: LineItemList
        order_totals: OrderTotals
        shipping_status: String
        attachments: AttachmentsByType
        # 3 payment_status: full, partial, none
        payment_status: String
      }
    `,
    AttachmentsByType: graphql`{
      # Poof of Delivery
      POD:[Attachment]
      #Proof of Transaction
      POT:[Attachment]
    }
    `,
    Attachment: graphql`
      {
        id: ID
        attachment_id: Int
        description: String
        file_name: String
        content_type: String
        content: String
        # make sure it is padded with zeros
        generation_id: String
        # if attachment is an invoice, then 3 payment_status: full, partial, none else null
        payment_status: String
        # acknowledgement, invoice, delivery_photo, signature
        type: String
        invoice_number: String
        generate_encoding: Boolean
      }
    `,
    ShippingInformation: graphql`
      {
        address: Address
        ship_via: ShipVia
        # Shipping order header has a telephone number
        phone: String

        instructions: String
        name: String
      }
    `,
    BillingInformation: graphql`
      {
        address: Address
        #Phone is coming from the bill_to entity the first contact list phone number
        phone: String
        name: String
      }
    `,
    ShipVia: graphql`
      {
        ship_via_id: String
        description: String
      }
    `,
    SupportDoc: graphql`
      {
        name: String
        type: String
        url: String
      }
    `,
    Pricing: graphql`{
              id:ID
              currency: String
              customer_price: Float
              eclipse_part_number: Int!
              extended_price: Float
              list_price: Float
              quantity: Int
              uom: String
              quantity_uom: String
              use: String
              points: Int
          }`,
    Point: graphql`
      {
        id: ID
        description: String
        multiplier: Float
        value: Float
        category: Category
        manufacturer: Manufacturer
      }
    `,
    Promotion: graphql`
      {
        id: ID
        code: String
        marketing: String
        applicable: Boolean
        eligible: Boolean
        active: Boolean
      }
    `,
    ProductMerge: graphql`{
              id: ID
              key: String
              current_value: String
              values:[ProductMergeValue]
          }`,
    ProductMergeValue: graphql`
      {
        id: ID
        product: Product
        current: Boolean
        alternate: Boolean
        value: String
      }
    `,
    "Product implements Primary": graphql`{
            id(id: String): ID!
            isFusion: Boolean
            # Determines if this Product has all the fields needed to be displayed on our website.
            isEnriched: Boolean
            isClearance: Boolean
            attributes: [Attribute]
            bundle: Bundle
            collection: String
            apps: [String]
            associated_products(limit:Int): [Product]
            backOrderShippingOption: String
            buy_line: String
            category: Category
            category_ref: String
            customer_also_bought(limit:Int): [Product]
            related_products(limit:Int): [Product]
            description: String
            long_description: String
            encoded: [String]
            features_benefits: [String]
            hierarchies: [String]
            hierarchy: [String]
            index_type: String
            inventory(fresh:Boolean, qty: Int): Inventory
            inquiry_types: [InquiryType]
            manufacturer: Manufacturer
            manufacturer_name: String
            manufacturer_part_number: String
            name: String
            notes: String
            part_identifiers: JSONObject
            path: [String]
            points: Point
            points_value: Int
            price_line: String
            pricing: Pricing
            productID: Int!
            product_merge: [ProductMerge]
            images: [String]
            thumb: String
            og_image: String
            rank: Int
            status: String
            ship_date: String
            user_recently_viewed(limit:Int): [Product]
            uom_list: JSONObject
            volume: Float
            weight: Float
            search_index: Int
            cart_index: Int
            string: String
            trades: [String]
            matchLevel: Float
            timestamp: String
            sell_pkg_qty: Int
            support_docs: [SupportDoc]
            "extended_price"
            ext: Float
            # used to show the requested qty before it was changed
            previous_qty: Int
            # qty is the qty in cart for the product
            qty: Int
            uom: String

            #Reorder fields
            last_ordered_date: String
            last_ordered_qty: Int

            #Line Items 
            qty_ordered: Int
            qty_shipped: Int
            qty_refunded: Int
            
            # price per UOM
            # How much this product was sold at. Extended Price / Minimum Sell Qty 
            unit_price: Float
            # qty_ordered * unit_price = extended_price
            extended_price: Float

            #if project order, then Complete or Open, else should be generation Status
            shipping_status: String
            promotions: [Promotion]

            # Algolia meta data for search
            _highlightResult: JSONObject
            _rankingInfo: JSONObject

            # Kit
            quantityInKit: Int!
        }`,
    "ProductSearchResult implements SearchResult": graphql`{
              index: String
              page: Int
              pages: Int
              itemsPerPage: Int
              query: String
              total: Int
              hasResults: Boolean
              products(limit:Int): [Product]
              bestMatch: Float
          }`,
    "Manufacturer implements Primary": graphql`{
              collection: String
              categories: [Category]
              category: Category
              encoded: [String]
              id:ID
              name:String
              slug: String
              search_index: Int
              logo: String
              rank: Int
              AEDrank: Int
              CSTrank: Int
              AED: Boolean
              CST: Boolean
              aed: JSONObject
              cst: JSONObject
              featuredAED: Boolean
              featuredCST: Boolean
              string: String
              matchLevel: Float
              products(limit:Int): [Product]
              manufacturer: Manufacturer
              _highlightResult: JSONObject
              _rankingInfo: JSONObject
          }`,
    "ManufacturerSearchResult implements SearchResult": graphql`{
              index: String
              page: Int
              pages: Int
              itemsPerPage: Int
              query: String
              total: Int
              hasResults: Boolean
              manufacturers: [Manufacturer]
              bestMatch: Float
          }`,
    "Category implements Primary": graphql`{
              collection: String
              id: ID
              name: String
              slug: String
              slugs: String
              ref: String
              refs: [String]
              parent: String
              parent_ref: String
              children: [Category]
              children_refs: [String]
              category: Category
              depth: Int
              path: String
              paths: [String]
              categories: [Category]
              img: String
              hoverImg: String
              products(limit:Int): [Product]
              _highlightResult: JSONObject
              _rankingInfo: JSONObject
          }`,
    "CategorySearchResult implements SearchResult": graphql`{
              index: String
              page: Int
              pages: Int
              itemsPerPage: Int
              query: String
              total: Int
              hasResults: Boolean
              categories: [Category]
              bestMatch: Float
          }`,
    "Merge implements Primary": graphql`{
              collection: String
              id: ID!
              name: String!
              manufacturer: Manufacturer
              category: Category
              products(limit:Int): [Product]
              _highlightResult: JSONObject
              _rankingInfo: JSONObject
          }`,
    "MergeSearchResult implements SearchResult": graphql`{
              index: String
              page: Int
              pages: Int
              itemsPerPage: Int
              query: String
              total: Int
              hasResults: Boolean
              merges: [Merge]
              bestMatch: Float
          }`,
    SearchResults: graphql`{
              results: [SearchResult]
          }`,
    PrimaryResult: graphql`
      {
        id: ID
        data: Primary
      }
    `,
    QuickData: graphql`
      {
        id: ID
        data: JSONObject
      }
    `,
    FacetResult: graphql`{
            id: ID
            type: String
            categories: [Category]
            category: Category
            manufacturers: [Manufacturer]
            attributes: [Attribute]
            trades: [Trade]
            products(limit:Int): [Product]
            total: Int
            showing: Int
        }`,
    User: graphql`
      {
        id: ID
        name: String
        displayName: String
        test_app: String
        access: String 
        branch: Branch
        role: String
        aed_permissions: Permission
        cst_permissions: Permission
        permissions: NewPermissions
        email: String
        jobs: [String]
        favorites: [String]
        accountNav: JSONObject
        onlyFavoriteProducts: [String]
      }
    `,
    Permission: graphql`
      {
        createAdmin: Boolean
        createSubUser: Boolean
        deleteAdmin: Boolean
        manageFavs: Boolean
        shopFavs: Boolean
        manageJobs: Boolean
        editJobs: Boolean
        viewJobs: Boolean
        shopJobs: Boolean
        payInvoices: Boolean
        placeOrders: Boolean
        placeWorqOrders: Boolean
        reviewOrders: Boolean
        shopFullSite: Boolean
        showPrice: Boolean
        viewFinance: Boolean
        viewInvoices: Boolean
        viewOrders: Boolean
      }
    `,
    PointsBreakdown: graphql`
      {
        use: Int
        earn: Int
        total: Int
      }
    `,
    PointsTransaction: graphql`{
        id: String
        app: String
        customer_id: String
        dollar_value: Float 
        description: String
        pointsBreakdown: PointsBreakdown
        points_value: Int 
        points_snap_shot: JSONObject
        order_id: String
        line_item_list: [JSONObject] 
        shipping_branch: Branch
        timestamp: String
        willCallDateGroupedProducts: [FullfillmentDateGroupedProducts]
        willCallBundleDate: String
        estimatedDeliveryDate: String
    }`,
    FavoritesResult: graphql`{
          id: ID
          favorites: [Favorite]
          users: PermissionUsers
      }`,
    PermissionUsers: graphql`{
          admins: [User]
          editors: [User]
          viewers: [User]
          shoppers: [User]
      }`,
    Trade: graphql`
      {
        id: String
        name: String
        value: String
        icon: String
        img: String
        hoverImg: String
      }
    `,
    OrdersResult: graphql`{
        orders: [Order]
        updateTime: String
        counts: OrderCounts
    }`,
    OrderCounts: graphql`{
        completed: Int!
        inprocess: Int!
        worq: Int!
        total: Int!
        updated_time: String
    }`,
    OrderConfirmation: graphql`
      {
        order_id: String
        address: Address
        userName: String
        customer_po: String 
        willCallDateGroupedProducts: [FullfillmentDateGroupedProducts]
        deliveryDateGroupedProducts: [FullfillmentDateGroupedProducts]
        order_totals: OrderTotals
        pointsValue: Int
        shipping: String
        estimatedDeliveryDate: String
      }
    `,
    PointsDashboard: graphql`
      {
        points_earned: Int
        points_available: Int
        fusion_points_earned: Int
        summary: JSONObject
      }
    `,
    FullfillmentDateGroupedProducts: graphql`{
        fulfillmentDate: String
        products: [Product]
    }`,
    Response: graphql`
      {
        success: Boolean
        timestamp: String
        message: String
      }
    `,
    UpdatingResponse: graphql`
      {
        id: String
        isUpdating: Boolean
        lastUpdated: String
      }
    `,
    UsersDirectoryResult: graphql`{
      users: [User]
      customerJobs: [Job]
      customerFavorites: [Favorite]
    }
    `,
    Kit: graphql`{
      id: String
      name: String!
      description: String!
      app: String!
      products: [Product]!
      top3products: [String]!
      lastUpdatedBy: String!
      lastUpdatedTimestamp: String!
      totalPoints: Int!
      totalPrice: Float!
      totalProducts: Int!
      productIds: [String]!
    }`,
    KitProduct: graphql`
      {
        id: Int
        quantityInKit: Int
      }
    `,
    WorqOrder: graphql`{
              jobId: String
              bill_to: String
              ship_to: String
              customer_po: String!
              sales_source: String
              ordered_by: String
              internal_notes: String
              address_street_1: String
              address_street_2: String
              address_city: String
              address_state: String
              address_postal_code: String
              address_country: String
              ship_via_id: String
              telephone_number: String
              cart_id:String!
              points: Boolean
              fulfillment: String
              release_number: String
              shipping_instructions: String
              shipping_branch: String
              shipping_branch_name: String
              customBranchID: String
    }`,
    Query: graphql`{
            account: Account
            accountNavBarItems: [JSONObject]
            accountRequest: String
            accessPresets: [AccessPreset]
            cart(points: Boolean, customBranchID: String, shipping: String): Cart
            currentUser: User
            categories(
              limit: Int
              sort: String
              wheres: [CollectionWhere]
            ): [Category]
            attachment(
              id: ID, 
              order_id: String, 
              generation_id: String, 
              generate_encoding: Boolean
            ): Attachment
            banners: [Banner]
            branches(    
              limit: Int
              sort: String
              wheres: [CollectionWhere]): [Branch]
            customerJobs(status: String): [Job]
            customerBranches: [Branch]
            customerFavorites: [Favorite]
            eclipse(
              inquiry: String! 
              inputs: JSONObject
              write: Boolean
              log: Boolean
            ): JSONObject
            ezSelectors: [ezSelector]
            ezSelectorGroups: [ezSelectorGroup]
            facet(
              brand_slug: String
              multiplier: Int
              categories_slug: String
              category_id: String
              attributes: JSONObject
              tradesObj: JSONObject
              limit: Int
              page: Int
              purchase_type: [String]
              search_term: String
              isClearance: Boolean
            ): FacetResult
            favorites: FavoritesResult
            get(
                id: ID
                collection: String
                slug: String
                category: String
                additional: JSONObject
                limit: Int
            ): PrimaryResult
            getInvoice(
              order_id: String
              invoice_number: String
            ): Attachment
            # should the result be an array of Category ?
            hotsheet: [JSONObject]
            # All kit queries
            customerKits: [Kit]
            getKit(
              id: String
            ): Kit
            # End kit queries
            # All saved cart queries
            savedCarts: [Cart]
            # End saved cart queries
            manufacturers(
                limit: Int
                sort: String
                wheres: [CollectionWhere]
            ): [Manufacturer]
            noLoginApp: String
            navBarItems: [JSONObject]
            search(
                query:String
                collections: [SearchCollection]
            ): SearchResults
            quickget(
                id: String
                collection:String
            ): QuickData
            quicksearch(
                query:String
                collection:String
                sort:String
                dir: String
                page: Int
                itemsPerPage: Int
                where: JSONObject
            ): JSONObject
            isJobalyticsUpdating(id: String, timestamp: String): UpdatingResponse
            jobs(
              # active or archive
              status: String
              ): [Job]
            job(
              # the job id that you need to get the information for
              id: ID
              ): Job
            jobsUsers: PermissionUsers
            users(
             customer_id: String   
            ): [User]
            userFavorites: FavoritesResult
            orders(pagination:Pagination, filter: OrdersFilter): OrdersResult
            order(
                order_id: String   
            ): Order
            orderConfirmation(order_id: String, points: Boolean): OrderConfirmation
            pointsOrderConfirmation(order_id: String, points: Boolean): PointsTransaction
            pointsDashboard: PointsDashboard
            reorder(sort: String, limit: Int, dir: String): ReorderResult
            shouldUpdateData(dataType: String): Boolean
            subBanners: [Banner]
            trades: [Trade]
            user: User
            usersDirectory: UsersDirectoryResult
            pointsActivity(pagination: Pagination): [PointsTransaction]
            previewOrderSubmit(
                bill_to: String
                ship_to: String
                customer_po: String!
                sales_source: String
                internal_notes: String
                ordered_by: String
                address_street_1: String
                address_street_2: String
                address_city: String
                address_state: String
                address_postal_code: String
                address_country: String
                ship_via_id: String
                telephone_number: String
                cart_id:String
                points: Boolean
                shipping_instructions: String
                shipping_branch: String
                shipping_branch_name: String
            ): Order
            verifyAccount(id: String): Customer
            verifyUserDocExists(id: ID): User
            doesUserExistWithEmail(email: String): Response
            shipmentInquiries(orderID: String): JSONObject
            worqOrders: [WorqOrder]
            getOmittedUsersFromWorqEmails: OmittedUsers
        }`,
    Mutation: graphql`{
            removeOmitUser(
              omitUserIDs: [Int]
            ): Response
            addJob(
                id: String
                AED: Boolean
                CST: Boolean
                address: InputAddress
                branch: String
                customerPO: String
                deliveryInstructions: String
                shipping: String
                fulfillment: String
                phone: String
                contact: String
                name: String
                users: [String]
            ): Job
            addJobRequest(
                amountAndDescriptionOfMaterialsToBeFurnished: String!
                beginningDate: String!
                endDate: String!
                spendThreshold: Int!
                contractType: String
                subContractorUsed: Boolean
                lenderUsed: Boolean
                customerName: String!
                customerAccountNumber: String!
                customerStreetAddress: String!
                customerCity: String!
                customerState: String!
                customerZip: String!
                customerPhone: String!
                customerFax: String!
                customerEmail: String!
                jobName: String!
                jobNumber: String!
                jobStreetAddress: String!
                jobCity: String!
                jobState: String!
                jobZip: String!
                jobPhone: String!
                jobFax: String
                jobEmail: String!
                ownerName: String
                ownerStreetAddress: String!
                ownerCity: String!
                ownerState: String!
                ownerZip: String!
                ownerPhone: String!
                ownerFax: String
                ownerEmail: String!
                contractorName: String!
                contractorStreetAddress: String!
                contractorCity: String!
                contractorState: String!
                contractorZip: String!
                contractorPhone: String!
                contractorFax: String
                contractorEmail: String!
                estimatedDollarValueEntireProject: Int!
                estimatedMaterials: Int!
                verificationFullName: String!
                verificationDate: String!
            ): Response 
            addOrderToJob(orderID: String, jobID: String): Order
            addRecentlyViewedProduct(product_id: String): [String]
            addUser(id: String, name: String, email: String, role: String, access: String, branch: Int, permissions: InputNewPermissions): User
            contactSalesPerson(email:String, message: String): Response
            deleteWorqOrder(orderID: String): Order
            editUser(id: String, name: String, email: String, role: String, access: String, branch: Int, permissions: InputNewPermissions): User
            addUsersToJobs(users: [String], jobs:[String] ): ActionUsersToJobsResult
            addUsersToFavorites(users: [String], favorites:[String] ): ActionUsersToFavoritesResult
            approveWorqOrder(orderID: String): Order
            archiveAedJob(jobId: String!, jobName: String, requestsUnconditionalFinal: Boolean): Response
            refreshAedJobDetails(jobId: String!) : Job
            updateAedJob(jobId: String!, jobName: String, endDate: String, estimatedMaterials: String, isHouse: Boolean): Response
            updateCart(
                productIDs: [Int]
                qty: Int
                uom: String
                points: Boolean
                customCartID: String
            ): Cart 
            saveCart(
              cartID: String
              name: String
            ): Response
            loadCart(
              cartID: String
            ): Response
            deleteCart(
              cartID: String
            ): Cart,
            updateCartProductNotes(productID: String, notes: String, points: Boolean): Cart
            updateCartProductBackOrderShippingOption(productID: String, backOrderShippingOption: String, points: Boolean): Cart
            addFavorite(
                id: String
                name: String
                users: [String]
                products: [String]
                remove: Boolean
            ): Favorite
            updateFavorite(
                id: String
                name: String
                users: [String]
                products: [String]
                remove: Boolean
            ): Favorite
            updateJob(
              id: String
              AED: Boolean
              CST: Boolean
              address: InputAddress
              branch: String
              customerPO: String
              deliveryInstructions: String
              shipping: String
              fulfillment: String
              phone: String
              contact: String
              name: String
              users: [String]
          ): Job
          # mutation to start the trigger for updating of jobalytics data for the given job id
          updateJobalytics(id: ID, numberOfMonthsAgo: Int) : Response
          ezAddToCart(
            EZProducts: [ezIncomingProduct]
            ): Cart
          pointsOrderSubmit( 
              bill_to: String
              ship_to: String
              customer_po: String!
              sales_source: String
              internal_notes: String
              ordered_by: String
              address_street_1: String
              address_street_2: String
              address_city: String
              address_state: String
              address_postal_code: String
              address_country: String
              ship_via_id: String
              telephone_number: String
              shipping_instructions: String
              shipping_branch: String
              shipping_branch_name: String
              customBranchID: String): Order
            updateWorqOrderShippingInformation( 
                orderID: String
                address_street_1: String
                address_street_2: String
                address_state: String
                address_city: String
                address_postal_code: String): Order
            updateWorqOrderCustomerPO( 
              orderID: String
              customerPO: String): Order
            orderSubmit(
                jobId: String
                bill_to: String
                ship_to: String
                customer_po: String!
                sales_source: String
                contact_name: String
                internal_notes: String
                address_street_1: String
                address_street_2: String
                address_city: String
                address_state: String
                address_postal_code: String
                address_country: String
                ship_via_id: String
                telephone_number: String
                cart_id:String!
                points: Boolean
                fulfillment: String
                release_number: String
                shipping_instructions: String
                shipping_branch: String
                shipping_branch_name: String
                customBranchID: String
            ): OrderSubmitResult
            updateOrders: OrdersResult
            updateReorders: UpdateReorderResult
            updateNewUserAfterAuth(tempID: String, uid: String): String
            removeFavorite(id:String): Favorite
            removeJob(id: String, name: String): Job
            removeOrderFromJob(orderID: String, jobID: String): Order
            removeUsers(ids: [String]): [User]
            removeUsersFromJobs(users: [String], jobs: [String]): ActionUsersToJobsResult
            removeUsersFromFavorites(users: [String], favorites: [String]): ActionUsersToFavoritesResult
            requestAccount(access: String, address: InputAddress, accountName: String, accountNumber: Int, creditAccount: Boolean, email: String, phone: String, masterEmail: String, masterName: String,firstName: String, lastName: String, branch: InputBranch): Entity
            requestUser(access: String, address: InputAddress, accountName: String, accountNumber: Int, creditAccount: Boolean, email: String, phone: String,firstName: String, lastName: String, branch: InputBranch): User
            sendProductDetailInquiry(product_id:String, name: String, description:String, manufacturer_part_number:String,img:String, inquiry_type: String, inquiry_name:String, message: String): JSONObject
            sendInvoiceInquiry(orderID: String, invoiceID: String, remittanceID: String, inquiry: String): Response
            sendResetPasswordEmail(email: String): Response
            sendAccountRequestNoMasterEmail(id: String) : Response
            sendShipmentInquiries(orderID: String, shipmentInquiries: JSONObject): JSONObject
            specialOrderSubmit(
              first_name: String
              last_name: String
              company_name: String
              phone_number: String
              email: String
              items: [ezIncomingProduct]
            ): Response
            worqOrderSubmit(
              jobId: String
              bill_to: String
              ship_to: String
              customer_po: String!
              sales_source: String
              ordered_by: String
              internal_notes: String
              address_street_1: String
              address_street_2: String
              address_city: String
              address_state: String
              address_postal_code: String
              address_country: String
              ship_via_id: String
              telephone_number: String
              cart_id:String!
              points: Boolean
              fulfillment: String
              release_number: String
              shipping_instructions: String
              shipping_branch: String
              shipping_branch_name: String
              customBranchID: String): Order
            # All kit mutations
            editKit(
              id: String
              name: String!
              description: String!
              products: [IncomingKitProduct]!
            ): Kit
            deleteKit(
              id: String
            ): Kit
            addCustomerKit(
              name: String
              description: String
            ) : Response
            addProductToKit(
              kitID: String
              productID: [String]
              quantity: Int
            ) : Response
            deleteProductFromKit(
              kitID: String
              productID: [String]
            ) : Response
            shopKit(
              products: [IncomingKitProduct]
            ): Response
        }`,
  },
};

// ActionUsersToFavoritesResult
const schema = `
  ${schema_json.scalars.map((scalar) => `scalar ${scalar}`).join(`\n`)}
  ${Object.keys(schema_json.enum)
    .map((key) => `enum ${key} ${schema_json.enum[key]}`)
    .join(`\n`)}
  ${Object.keys(schema_json.types)
    .map((key) => `type ${key} ${schema_json.types[key]}`)
    .join(`\n`)}
  ${Object.keys(schema_json.inputs)
    .map((key) => `input ${key} ${schema_json.inputs[key]}`)
    .join(`\n`)}
  ${Object.keys(schema_json.interfaces)
    .map((key) => `interface ${key} ${schema_json.interfaces[key]}`)
    .join(`\n`)}
  `;
exports.schema = schema;
exports.schema_json = schema_json;
