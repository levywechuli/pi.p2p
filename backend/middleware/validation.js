// Validation middleware for API requests

// Validate message content
function validateMessage(req, res, next) {
  const { message } = req.body;

  // Check if message exists
  if (!message) {
    return res.status(400).json({
      success: false,
      error: 'Message is required',
      field: 'message'
    });
  }

  // Check if message is string
  if (typeof message !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Message must be a string',
      field: 'message'
    });
  }

  // Check if message is not empty after trimming
  if (message.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Message cannot be empty',
      field: 'message'
    });
  }

  // Check message length (max 1000 characters)
  if (message.length > 1000) {
    return res.status(400).json({
      success: false,
      error: 'Message is too long (max 1000 characters)',
      field: 'message',
      maxLength: 1000,
      currentLength: message.length
    });
  }

  // Sanitize message (remove potential harmful content)
  req.body.message = message.trim();

  next();
}

// Validate user identifier
function validateUserIdentifier(req, res, next) {
  const { userIdentifier } = req.body;

  // User identifier is optional, but if provided, validate it
  if (userIdentifier !== undefined) {
    if (typeof userIdentifier !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'User identifier must be a string',
        field: 'userIdentifier'
      });
    }

    if (userIdentifier.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'User identifier is too long (max 100 characters)',
        field: 'userIdentifier',
        maxLength: 100,
        currentLength: userIdentifier.length
      });
    }

    // Sanitize user identifier
    req.body.userIdentifier = userIdentifier.trim();
  }

  next();
}

// Validate pagination parameters
function validatePagination(req, res, next) {
  const { page, limit } = req.query;

  if (page !== undefined) {
    const pageNum = parseInt(page);
    if (isNaN(pageNum) || pageNum < 1) {
      return res.status(400).json({
        success: false,
        error: 'Page must be a positive integer',
        field: 'page'
      });
    }
    req.query.page = pageNum;
  }

  if (limit !== undefined) {
    const limitNum = parseInt(limit);
    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      return res.status(400).json({
        success: false,
        error: 'Limit must be between 1 and 100',
        field: 'limit',
        min: 1,
        max: 100
      });
    }
    req.query.limit = limitNum;
  }

  next();
}

// Validate date format (YYYY-MM-DD)
function validateDate(dateString) {
  if (!dateString) return true; // Optional field
  
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}

// Validate admin query parameters
function validateAdminQuery(req, res, next) {
  const { dateFrom, dateTo, minWords, maxWords, sortBy, sortOrder } = req.query;

  // Validate dates
  if (dateFrom && !validateDate(dateFrom)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid dateFrom format. Use YYYY-MM-DD',
      field: 'dateFrom'
    });
  }

  if (dateTo && !validateDate(dateTo)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid dateTo format. Use YYYY-MM-DD',
      field: 'dateTo'
    });
  }

  // Validate word counts
  if (minWords !== undefined) {
    const min = parseInt(minWords);
    if (isNaN(min) || min < 0) {
      return res.status(400).json({
        success: false,
        error: 'minWords must be a non-negative integer',
        field: 'minWords'
      });
    }
  }

  if (maxWords !== undefined) {
    const max = parseInt(maxWords);
    if (isNaN(max) || max < 0) {
      return res.status(400).json({
        success: false,
        error: 'maxWords must be a non-negative integer',
        field: 'maxWords'
      });
    }
  }

  // Validate sort parameters
  const validSortFields = ['id', 'created_at', 'updated_at', 'word_count', 'user_identifier'];
  if (sortBy && !validSortFields.includes(sortBy)) {
    return res.status(400).json({
      success: false,
      error: `Invalid sortBy field. Must be one of: ${validSortFields.join(', ')}`,
      field: 'sortBy',
      validFields: validSortFields
    });
  }

  const validSortOrders = ['ASC', 'DESC'];
  if (sortOrder && !validSortOrders.includes(sortOrder.toUpperCase())) {
    return res.status(400).json({
      success: false,
      error: `Invalid sortOrder. Must be one of: ${validSortOrders.join(', ')}`,
      field: 'sortOrder',
      validOrders: validSortOrders
    });
  }

  next();
}

// Rate limiting simulation (basic implementation)
const rateLimitMap = new Map();

function rateLimit(maxRequests = 100, windowMs = 15 * 60 * 1000) { // 100 requests per 15 minutes
  return (req, res, next) => {
    const clientId = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!rateLimitMap.has(clientId)) {
      rateLimitMap.set(clientId, { count: 1, resetTime: now + windowMs });
      return next();
    }

    const clientData = rateLimitMap.get(clientId);
    
    if (now > clientData.resetTime) {
      // Reset the counter
      rateLimitMap.set(clientId, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (clientData.count >= maxRequests) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests',
        retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
      });
    }

    clientData.count++;
    next();
  };
}

module.exports = {
  validateMessage,
  validateUserIdentifier,
  validatePagination,
  validateAdminQuery,
  rateLimit
};
